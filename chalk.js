import chalk from 'chalk';

export const successMessage = (message) => {
  const date = new Date();
  const timeString = chalk.white(
    date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  );
  const formattedMsg = chalk.green.italic(message);
  console.log(`[${timeString}] : ${formattedMsg}`);
};

export const failMessage = (message) => {
  const date = new Date();
  const timeString = chalk.white(
    date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  );
  const formattedMsg = chalk.red.italic(message);
  console.log(`[${timeString}] : ${formattedMsg}`);
};

export const infoMessage = (message) => {
  const date = new Date();
  const timeString = chalk.white(
    date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  );
  const formattedMsg = chalk.rgb(190, 37, 179).italic(message);
  console.log(`[${timeString}] : ${formattedMsg}`);
};
