// 
// "background": {
//     "service_worker": "background.js"
//   },
//   

// chrome.tabs.onUpdated.addListener((tabId, tab) => {
//   if (tab.url && tab.url.includes("kite.zerodha.com/holdings")) {
//     const queryParameters = tab.url.split("?")[1];
//     const urlParameters = new URLSearchParams(queryParameters);

//     chrome.tabs.sendMessage(tabId, {
//       type: "NEW",
//       videoId: urlParameters.get("v"),
//     });
//   }
// });

userId = null;
// context = null;
// if (typeof chrome !== 'undefined') {
//     context = chrome;
// }
// else if (typeof browser !== 'undefined') {
//     context = browser;
// }

// chrome.storage.onChanged.addListener((changes, area) => {
//     if (area === 'sync' && changes.options?.newValue) {
//         const debugMode = Boolean(changes.options.newValue.debug);
//         console.log('enable debug mode?', debugMode);
//         setDebugMode(debugMode);
//     }
// });


function saveUserId(userId) {
    if (userId && userId !== 'undefined') {// localStorage.setItem("userId", userId)
        let data = { userId }
        chrome.storage.sync.set({ "ReckonData": data }, function () {
            console.log('Data stored', data);
        });
    }
}
async function getUserId() {
    // return localStorage.getItem("userId")
    let data = await chrome.storage.sync.get(["ReckonData"])
    userId = data.ReckonData?.userId || null
    console.log('Stored data', data, userId);

    return userId || null;
}

getUserId()





chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
    // if (message.action === "openPopup") {
    //     openPopup();
    // }
    if (message.type === "UserPortfolio") {
        let data = await getPopupData(message.data)
        // // console.log({ data })
        // // sendResponse(data)
        // getPopupData(message.data).then(res => {
        //     sendResponse(res)
        // })
        // chrome.runtime.sendMessage(
        //     message = {
        //       type: "PopupDataResponse",
        //       value:data
        //     },

        //   )
        // console.log({ sender })
        // chrome.runtime.sendMessage(
        //     message = {
        //         type: "PopupDataResponse",
        //         value: data
        //     },

        // )

        features = await chrome.storage.sync.get("ReckonFeatures")
        features = features["ReckonFeatures"]

        chrome.tabs.sendMessage(sender.tab.id, {
            type: "UserRecos",
            value: { data, features }
        });
    } else if (message.type === "getUserId") {
        userId = userId || await getUserId()
        sendResponse(userId)
    } else if (message.type === "saveUserId") {
        message.data && saveUserId(message.data)
    } else if (message.type === "getFeatures") {
        sendResponse(config.features)
    }
});

// function openPopup() {
//     chrome.windows.create({
//         type: "panel",
//         url: "index.html",
//         width: 400,
//         height: 300,
//         // You can specify additional window options here
//     });
// }


async function getPopupData(data) {

    console.log({ userId })
    userId = userId || await getUserId()

    let fd = new FormData()
    fd.append('data', JSON.stringify(data))
    // fd.append('email', "azillion646@gmail.com")
    fd.append('userId', userId)

    let res = await fetch("https://api.reckon.live/api/getPortfolioInsights/", {
        method: "POST",
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        body: fd,
        // body: JSON.stringify({
        //     data,
        //     email: "azillion646@gmail.com",
        //     userId: "fb819300-0f27-4ebb-941a-c2046ad180db"

        // }),
        credentials: 'omit',
    }).then(r => r.json()).then(res => {
        if (res.userId && typeof res.userId == "string" && res.userId !== userId) {
            console.log({ "res.userId": res.userId }, res)
            saveUserId(res.userId)
        }
        return res;
    })
    return res
}



chrome.storage.onChanged.addListener((changes, namespace) => {
    // console.warn({ changes, namespace })
    // for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    //     console.log(
    //         `Storage key "${key}" in namespace "${namespace}" changed.`,
    //         `Old value was "${oldValue}", new value is "${newValue}".`
    //     );
    // }
    if (namespace == "sync") {
        if (changes.ReckonFeatures) {
            config.features = changes.ReckonFeatures.features.newValue;
        }
    }
});