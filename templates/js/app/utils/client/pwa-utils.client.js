/* 
  Project Fugu APIs 
  & 
  other client-side Service Worker methods & APIs  
*/

/* 
  ⚠ Except you understand what you're what you are doing, don't modify this file! ⚠
*/

// Clipborad Copy API

export async function copyText(text) {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return {
        status: "success",
        message: "Copied to clipboard",
      };
    } else {
      return {
        status: "bad",
        message: "Your browser does not support clipboard API",
      };
    }
  } catch (err) {
    throw new Error("Unable to copy text to clipboard!");
  }
}

// Handle connectivity check and return one of the specifics

export async function checkConnectivity(online, offline) {
  try {
    if (navigator.onLine) {
      online();
      return {
        status: "success",
        message: "Connected to the internet",
      };
    } else {
      offline();
      return {
        status: "bad",
        message: "No internet connection available",
      };
    }
  } catch (err) {
    throw new Error("Unable to check network connectivity!");
  }
}

// Keep device awake for a determined period of time

export async function WakeLock() {
  try {
    if ("wakeLock" in navigator) {
      // This is an experimental feature!

      //@ts-ignore
      const wakelock = navigator.wakeLock.request("screen");
      if (wakelock) {
        return {
          status: "success",
          message: "WakeLock activated!",
        };
      } else {
        return {
          status: "bad",
          message: "WakeLock activation failed!",
        };
      }
    } else {
      return {
        status: "bad",
        message: "Your browser does not support WakeLock API!",
      };
    }
  } catch (err) {
    throw new Error("Error activating WakeLock!");
  }
}

// Badge creator

export async function addBadge(numberCount) {
  try {
    //@ts-ignore
    if (navigator.setAppBadge) {
      //@ts-ignore
      await navigator.setAppBadge(numberCount);
      return {
        status: "success",
        message: "Badge successfully added",
      };
    } else {
      return {
        status: "bad",
        message: "Badging API not supported",
      };
    }
  } catch (err) {
    console.debug(err)
    throw new Error("Error adding badge!");
  }
}

// remove Badges

export async function removeBadge() {
  try {
    //@ts-ignore
    if (navigator.clearAppBadge) {
      //@ts-ignore
      await navigator.clearAppBadge();
      return {
        status: "success",
        message: "Cleared badges",
      };
    } else {
      return {
        status: "bad",
        message: "Badging API not supported in this browser!",
      };
    }
  } catch (error) {
    console.debug(error)
    throw new Error("Error removing badge!");
  }
}

// Enable Full-Screen mode for an app

export async function EnableFullScreenMode() {
  try {
    if (document.fullscreenEnabled) {
      document.documentElement.requestFullscreen();
      return {
        status: "success",
        message: "Fullscreen mode activated",
      };
    } else {
      return {
        status: "bad",
        message: "Fullscreen mode not supported",
      };
    }
  } catch (err) {
    console.debug(err)
    throw new Error("Error activating fullscreen mode!");
  }
}

// Exit fullscreen mode

export async function ExitFullScreenMode() {
  try {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      return {
        status: "success",
        message: "Fullscreen mode deactivated",
      };
    } else {
      return {
        status: "bad",
        message: "Fullscreen mode not supported",
      };
    }
  } catch (err) {
    console.debug(err)
    throw new Error("Error deactivating fullscreen mode!");
  }
}

// Send a client notification to the user

export async function SendNotification(
  title,
  options
) {
  try {
    if ("Notification" in window) {
      const permissions = await (
        await navigator.permissions.query({ name: "notifications" })
      ).state;
      navigator.permissions
        .query({ name: "notifications" })
        .then((permissionStatus) => {
          if (permissionStatus.state === "granted") {
            return;
          } else {
            return Notification.requestPermission();
          }
        });

      if (permissions === "granted") {
        await navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification(title, options);
          return {
            status: "success",
            message: "Sent Notification to user successfully",
          };
        });
      } else {
        return {
          status: "bad",
          message: "Denied access to sending notifications!",
        };
      }
    } else {
      return {
        status: "bad",
        message: "Notification API not supported",
      };
    }
  } catch (error) {
    console.debug(error)
    throw new Error("Error sending notification!");
  }
}