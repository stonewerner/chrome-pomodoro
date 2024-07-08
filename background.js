chrome.runtime.onInstalled.addListener(() => {
    chrome.alarms.clearAll();
  });
  
  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "pomodoroTimer") {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon.png',
        title: 'Pomodoro Timer',
        message: "Time's up!",
        priority: 2
      });
    }
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'startTimer') {
      const delayInMinutes = request.minutes;
      chrome.alarms.create("pomodoroTimer", { delayInMinutes: delayInMinutes });
      sendResponse({ status: 'timerStarted' });
    } else if (request.type === 'clearTimer') {
      chrome.alarms.clear("pomodoroTimer");
      sendResponse({ status: 'timerCleared' });
    }
  });
  