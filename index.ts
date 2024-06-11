#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

class Hero {
  name: string;
  fuel: number = 100;

  constructor(name: string) {
    this.name = name;
  }

  decreaseFuel() {
    this.fuel -= 25;
  }

  increaseFuel() {
    this.fuel = 100;
  }
}

class Enemy {
  name: string;
  fuel: number = 100;

  constructor(name: string) {
    this.name = name;
  }

  decreaseFuel() {
    this.fuel -= 25;
  }

  increaseFuel() {
    this.fuel = 100;
  }
}

async function main() {
  const { heroName } = await inquirer.prompt([
    {
      type: "input",
      name: "heroName",
      message: "Enter hero name",
    },
  ]);

  const { enemyName } = await inquirer.prompt([
    {
      type: "list",
      name: "enemyName",
      message: "Choose an enemy",
      choices: ["alian", "witch", "skeleton"],
    },
  ]);

  const hero = new Hero(heroName);
  const enemy = new Enemy(enemyName);
  console.log(`${chalk.bold.bgRedBright(enemy.name)} v/s ${chalk.bold.bgBlueBright(hero.name)}`);

  do {
    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "Choose an action",
        choices: ["Attack", "Defend", "Run"],
      },
    ]);

    switch (action) {
      case "Attack":
        const randomNum = Math.random();
        if (randomNum > 0.5) {
          hero.decreaseFuel();
          console.log(`${chalk.bold.blueBright(hero.name)} health: ${chalk.red(hero.fuel)}`);
          console.log(`${chalk.bold.redBright(enemy.name)} health: ${chalk.red(enemy.fuel)}`);
          if (hero.fuel <= 0) {
            console.log(chalk.bold.red("You lost! Try again."));
            return;
          }
        } else {
          enemy.decreaseFuel();
          console.log(`${chalk.bold.blueBright(hero.name)} health: ${chalk.red(hero.fuel)}`);
          console.log(`${chalk.bold.redBright(enemy.name)} health: ${chalk.red(enemy.fuel)}`);
          if (enemy.fuel <= 0) {
            console.log(chalk.bold.green("Congratulations, you won!"));
            return;
          }
        }
        break;

      case "Defend":
        // Add defend logic here
        break;

      case "Run":
        console.log(chalk.bold.yellow("You ran away!"));
        return;
    }
  } while (true);
}

main();

