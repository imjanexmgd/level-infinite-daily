import axios from 'axios';
import fs from 'fs';
import { failMessage, infoMessage, successMessage } from './chalk.js';
const getUserInfo = async (header) => {
  try {
    const { data } = await axios.get(
      'https://api-pass.levelinfinite.com/api/ugc/user/get_info',
      {
        headers: {
          ...header,
        },
      }
    );
    return data.data;
  } catch (error) {
    throw error;
  }
};
const getTask = async (header) => {
  try {
    const { data } = await axios.get(
      'https://api-pass.levelinfinite.com/api/rewards/proxy/lipass/Points/GetTaskListWithStatus',
      {
        params: {
          language: 'en',
        },
        headers: {
          ...header,
        },
      }
    );
    return data.data;
  } catch (error) {
    throw error;
  }
};
const checkLogin = async (header) => {
  try {
    const { data } = await axios.get(
      'https://api-pass.levelinfinite.com/api/ugc/user/check_login',
      {
        headers: {
          ...header,
        },
      }
    );
    if (data) {
      successMessage('valid cookie detected');
    }
  } catch (error) {
    failMessage('ooops fail when check cookie');
    throw error;
  }
};
const reqDailyCheckin = async (header) => {
  try {
    const { data } = await axios.post(
      'https://api-pass.levelinfinite.com/api/rewards/proxy/lipass/Points/DailyCheckIn',
      {
        task_id: '15',
      },
      {
        headers: {
          ...header,
        },
      }
    );
    if (data) {
      successMessage(`Success get 100 point`);
    }
  } catch (error) {
    throw error;
  }
};
const checkPoint = async (header) => {
  try {
    const { data } = await axios.get(
      'https://api-pass.levelinfinite.com/api/rewards/proxy/lipass/Points/GetUserTotalPoints',
      {
        headers: {
          ...header,
        },
      }
    );
    return data.data.total_points;
  } catch (error) {
    throw error;
  }
};
(async () => {
  try {
    process.stdout.write('\x1Bc');
    console.log(`level infinite daily check in \nMade with ❤️ by janexmgd`);
    const listCookie = fs
      .readFileSync('cookie.txt', 'utf-8')
      .replace(/\r/g, '')
      .split('\n');
    for (const cookie of listCookie) {
      const headers = {
        accept: 'application/json, text/plain, */*',
        'accept-language': 'en-US,en;q=0.7',
        'cache-control': 'no-cache',
        cookie: cookie,
        origin: 'https://pass.levelinfinite.com',
        pragma: 'no-cache',
        priority: 'u=1, i',
        referer: 'https://pass.levelinfinite.com/',
        'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Brave";v="126"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'sec-gpc': '1',
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        'x-common-params':
          '{"game_id":"4","area_id":"global","source":"pc_web"}',
      };
      await checkLogin(headers);
      const userInfo = await getUserInfo(headers);

      const points = await checkPoint(headers);
      successMessage(
        `Logged as ${userInfo.username} with total points ${points}`
      );
      const rewardInfo = await getTask(headers);
      if (rewardInfo.tasks[0].is_completed == true) {
        failMessage(
          `username ${userInfo.username} already sign in back at tommorow`
        );
      } else {
        infoMessage(`username ${userInfo.username} doing daily checkin`);
        await reqDailyCheckin(headers);
      }
    }
    infoMessage(`${listCookie.length} account process done`);
  } catch (error) {
    console.log(error);
  }
})();
