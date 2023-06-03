
(() => {
  console.log("Log From Content Script");
  tablePath = "#app div.container-right table";
  portfolio = [];

  const roundToDecimal = (num, ddigits = 1) => {
    let l = 10 ** ddigits;
    return Math.round(num * l) / l;
  };
  const calAllocPercent = () => {
    let total = portfolio.reduce(
      (acc, val) => acc + val.price * val.quantity,
      0
    );
    return portfolio.map((each) => {
      const allocationRatio = (each.quantity * each.price) / total;
      const allocationPercentage = allocationRatio * 100;
      return {
        ...each,
        // allocation: roundToOneDecimal(allocationPercentage).toString(),
        allocation: roundToDecimal(allocationPercentage, 5).toString(),
        // allocation: allocationPercentage,
      };
    });
  };

  const getTableContents = () => {
    try {
      portfolio = [];
      table = document.querySelector(tablePath);
      // console.log({ table });
      rows = table.querySelector("tbody").children;
      // console.log(
      //   { table, rows },
      //   rows[0].querySelector(".instrument span:first-child").innerText
      // );
      // $0.children[1].children[0].querySelector(".instrument span:first-child").innerText
      for (let i = 0; i < rows.length; i++) {
        tradingsymbol = rows[i].querySelector(".instrument span:first-child");
        quantity = rows[i].querySelector(".qty span:last-child");
        price = rows[i].querySelector("td:nth-child(4)");
        // console.log({ tradingsymbol, quantity, price });
        if (tradingsymbol && quantity && price) {
          data = {
            tradingsymbol: tradingsymbol.innerText.replace("*", ""),
            quantity: parseFloat(quantity.innerText),
            price: parseFloat(price.innerText.replace(",", "")),
          };
          portfolio.push(data);
        }
      }
      // console.log({ portfolio }, calAllocPercent());
      // return portfolio;
      return calAllocPercent();
    } catch (err) {
      console.error(err);
    }
  };

  const scrapePortfolio = () => {
    subPageUrl = location.href.split("/")[3];
    const fetchData = (next = null) => {
      var elms = document.querySelector(tablePath + " tbody").children;
      console.log("Data Not Found");
      if (elms.length > 0) {
        console.log("Data Found", elms.length);
        data = getTableContents();
        next && next();
        // resolve(data);
        return data;
      }
    };
    // if (subPageUrl !== "holdings") {
    //   document.querySelector('a[href="/holdings"]').click();
    //   // t = setInterval(() => fetchData(() => clearInterval(t)), 500);
    // } else {
    //   // fetchData();
    return fetchData();
    // }
    // // setTimeout(getTableContents, 500);
  };
  function createHIcons(symboldata) {
    return (
      Object.entries(symboldata)
        .map(([key, value]) => {
          return hIconHtml(value);
          // return `<span data-des="${value.description}" >${key}</span>`
        })
        .join("") ||
      `<div class="not-present" title="Instrument not considered!">!</div>`
      // `<div class="tooltip">
      //               <span class='not-present' title="
      //                 Instrument not considered!
      //               " >!</span>
      //     <div class="popup" style="display: none;">
      //       <div class="content">
      //             <h2>Instrument not considered!</h2>
      //       </div>
      //     </div>
      //   </div>`
    );
  }
  function createHIcon(symboldata) {
    return symboldata
      ? hIconHtml(symboldata)
      : `<div class="not-present" title="Instrument not considered!">!</div>`;
  }
  function hIconHtml(symboldata) {
    return `<div class="tooltip">
    <span class='icon' title="${symboldata.description}" >${getIcon(
      symboldata?.ruleType
    )}</span>
<div class="popup" style="display: none;">
<div class="content">
  <h2>${symboldata.description}</h2>
  ${symboldata.Action !== null ? `<button>${symboldata.Action}</button>` : ""}
</div>
</div>
</div>`;
  }
  function InsertIntoKiteTable(portfolio) {
    if (portfolio && Object.keys(portfolio).length > 0) {
      document.querySelectorAll(".plb").forEach((e) => e.remove());
      let tablePath = "#app div.container-right table";
      let table = document.querySelector(tablePath);
      var head = table.querySelector("thead").children;
      var rows = table.querySelector("tbody").children;

      if (rows.length > 0) {
        console.log("Data Found", rows.length);

        thElm = document.createElement("th");
        thElm.className = "plb";
        thElm.innerHTML = "PLB AI Recos";
        head[0].append(thElm);
        // head[0].innerHTML += `<th class='plb'>PLB AI Recos</th>`; // <th class='plb'>Actions</th>

        for (let i = 0; i < rows.length; i++) {
          tradingsymbol = rows[i].querySelector(".instrument span:first-child");
          // quantity = rows[i].querySelector(".qty span:last-child");
          // price = rows[i].querySelector("td:nth-child(4)");
          // console.log({ tradingsymbol, quantity, price });
          // if (tradingsymbol && quantity && price) {
          if (tradingsymbol) {
            data = {
              tradingsymbol: tradingsymbol.innerText.replace("*", ""),
              // quantity: parseFloat(quantity.innerText),
              // price: parseFloat(price.innerText.replace(",", "")),
            };

            // td = document.createElement("td");
            // td.innerText = "123";

            symboldata = portfolio[data.tradingsymbol];
            // console.log(data.tradingsymbol, { symboldata });
            tdElm = document.createElement("td");
            tdElm.className = "plb";
            tdElm.innerHTML = createHIcons(symboldata, data.tradingsymbol);
            rows[i].append(tdElm);
            // rows[i].innerHTML += `<td class="plb">${createHIcons(
            //   symboldata,
            //   data.tradingsymbol
            // )}</td>`;
          }
        }
      } else {
        console.log("Data Not Found");
      }
    }
  }


  function updateFeatures({ portfolio, features }) {
    console.log({ features });
    let keys = {
      tablePath: "#app div.container-right table",
      symbolPath: ".instrument span:first-child",
      thead: [
        {
          key: "riskProfile",
          label: "Risk Profile",
          rules: [19, 20, 21, 22, 23],
        },
        { key: "fundamentals", label: "Fundamentals", rules: [24, 25, 26] },
        {
          key: "priceAction",
          label: "Price Action",
          rules: [27, 28, 29, 30, 31, 32, 33, 34],
        },
        { key: "algorithms", label: "Algorithms (Paid feature)", rules: [201] },
      ],
      features,
    };
    // Formating data
    keys.thead = keys.thead.map((th) => ({
      ...th,
      rules: th.rules.map((rn) => "Rule" + rn),
    }));
    // Turning off empty columns
    let rulesAvailable = Object.values(portfolio)
      .map((obj) => Object.keys(obj))
      .join(); // .split(",").filter(e=>e)
    keys.thead.map((th) => {
      if (!th.rules.some((v) => rulesAvailable.includes(v))) {
        keys.features[th.key] = false;
      }
    });

    console.log({ keys });
    return new Promise((resolve, reject) => {
      if (portfolio && Object.keys(portfolio).length > 0) {
        document.querySelectorAll(".plb").forEach((e) => e.remove());
        let table = document.querySelector(keys.tablePath);
        var head = table.querySelector("thead").children;
        var rows = table.querySelector("tbody").children;

        if (rows.length > 0) {
          console.log("Data Found", rows.length);

          keys.thead.map((th) => {
            if (keys.features[th.key]) {
              // console.log({ feature: th.key });
              const thElm = document.createElement("th");
              thElm.className = "plb " + th.key;
              thElm.innerHTML = th.label;
              head[0].append(thElm);
            }
          });
          for (let i = 0; i < rows.length; i++) {
            tradingsymbol = rows[i].querySelector(keys.symbolPath);
            if (tradingsymbol) {
              tradingsymbol = tradingsymbol.innerText.replace("*", "");

              symboldata = portfolio[tradingsymbol];
              // console.log({ tradingsymbol, symboldata }, rows[i]);

              keys.thead.map((th) => {
                // console.log(th.key, keys.features[th.key]);
                if (keys.features[th.key]) {
                  // console.log({ feature: th.key, rules: th.rules });
                  let tdElm = document.createElement("td");
                  tdElm.className = "plb " + th.key;
                  let tdDiv = document.createElement("div");
                  th.rules.map((fRule) => {
                    if (symboldata[fRule]) {
                      tdDiv.innerHTML += createHIcon(symboldata[fRule]);
                    }
                  });
                  tdElm.append(tdDiv);
                  rows[i].append(tdElm);
                  //  console.log(rows[i], { tdElm });
                  // //   if (keys.features[th.key]) {

                  // //     Object.entries(symboldata).map(([key, value]) => {
                  // //       if (th.rules.includes(key)) {
                  // //         console.log({ ruleType: key });
                  // //         const tdDiv = document.createElement("div");
                  // //         tdDiv.innerHTML = createHIcon(value, tradingsymbol);
                  // //         tdElm.append(tdDiv);
                  // //       }
                  // //     });
                }
              });
            }
          }

          resolve("Hello");
        } else {
          console.log("Data Not Found");
          reject("This condition faild");
        }
      }
    });
  }

  // let youtubeLeftControls, youtubePlayer;
  // let currentVideo = "";
  // let currentVideoBookmarks = [];

  // const fetchBookmarks = () => {
  //   return new Promise((resolve) => {
  //     chrome.storage.sync.get([currentVideo], (obj) => {
  //       resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]) : []);
  //     });
  //   });
  // };

  // const addNewBookmarkEventHandler = async () => {
  //   const currentTime = youtubePlayer.currentTime;
  //   const newBookmark = {
  //     time: currentTime,
  //     desc: "Bookmark at " + getTime(currentTime),
  //   };

  //   currentVideoBookmarks = await fetchBookmarks();

  //   chrome.storage.sync.set({
  //     [currentVideo]: JSON.stringify([...currentVideoBookmarks, newBookmark].sort((a, b) => a.time - b.time))
  //   });
  // };

  // const newVideoLoaded = async () => {
  //   const bookmarkBtnExists = document.getElementsByClassName("bookmark-btn")[0];

  //   currentVideoBookmarks = await fetchBookmarks();

  //   if (!bookmarkBtnExists) {
  //     const bookmarkBtn = document.createElement("img");

  //     bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
  //     bookmarkBtn.className = "ytp-button " + "bookmark-btn";
  //     bookmarkBtn.title = "Click to bookmark current timestamp";

  //     youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
  //     youtubePlayer = document.getElementsByClassName('video-stream')[0];

  //     youtubeLeftControls.appendChild(bookmarkBtn);
  //     bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
  //   }
  // };
  // console.log({ runtime: chrome.runtime });
  // chrome.runtime.onConnect.addListener(function (port) {
  //   console.log({ port });
  //   console.assert(port.name === "PlbExt");
  //   port.onMessage.addListener( function (msg) {
  //     if (msg.action == "ScrapePortfolio") {
  //       data =  scrapePortfolio();
  //       console.log({ data });
  //       port.postMessage({ data });
  //     }
  //     // if (msg.joke === "Knock knock")
  //     //   port.postMessage({question: "Who's there?"});
  //     // else if (msg.answer === "Madame")
  //     //   port.postMessage({question: "Madame who?"});
  //     // else if (msg.answer === "Madame... Bovary")
  //     //   port.postMessage({question: "I don't get it."});
  //   });

  // });

  hasStoredData = !!localStorage.getItem("reckonData");

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value, videoId } = obj;
    console.log({ ...obj });
    if (type === "ScrapePortfolio") {
      data = scrapePortfolio();
      console.log({ data });
      // chrome.storage.sync.set({
      //   ["ScannedPortfolio"]: JSON.stringify(data),
      // });
      response(data);
    } else if (type == "GoToHoldings") {
      console.log("GoToHoldings");
      document.querySelector('a[href="/holdings"]').click();
    } else if (type == "ShowInKite") {
      InsertIntoKiteTable(value);
    } else if (type == "FeatureChange") {

      localStorage.setItem('reckonData', JSON.stringify(value))
      hasStoredData = true;

      updateFeatures(value)
        .then((message) => response({ success: true, message }))
        .catch((message) => response({ success: false, message }));
      // response();
    } else if (type == "UserRecos") {
      console.log({ value })
      updateFeatures({
        portfolio: value.data.recos, features: value.features
      })
    }
    //   // else if (type === "PLAY") {
    //   //   youtubePlayer.currentTime = value;
    //   // } else if (type === "DELETE") {
    //   //   currentVideoBookmarks = currentVideoBookmarks.filter(
    //   //     (b) => b.time != value
    //   //   );
    //   //   chrome.storage.sync.set({
    //   //     [currentVideo]: JSON.stringify(currentVideoBookmarks),
    //   //   });

    //   //   response(currentVideoBookmarks);
    //   // }
  });

  // var port = chrome.runtime.connect({ name: "knockknock" });
  // port.postMessage({ joke: "Knock knock" });
  // port.onMessage.addListener(function (msg) {
  //   if (msg.question === "Who's there?") port.postMessage({ answer: "Madame" });
  //   else if (msg.question === "Madame who?")
  //     port.postMessage({ answer: "Madame... Bovary" });
  // });

  // newVideoLoaded();

  function onPopupClick() {

    //   // chrome.runtime.sendMessage({ action: "openPopup" });
    //   // chrome.action.openPopup(); // "permissions": ["action"]

    // refreshView()

    portfolio = scrapePortfolio()
    data = portfolio?.map((d) => ({
      portfolio: d.tradingsymbol,
      allocation_percentage: roundToDecimal(d.allocation, 1).toString(),
    }))

    chrome.runtime.sendMessage(
      // extensionId?: string,
      message = {
        // type: "GetPopupData",
        type: "UserPortfolio",
        data
      },
      // // options?: object,
      // callback = (resp) => {
      //   console.log({ resp })
      //   updateFeatures({
      //     portfolio: resp.recos, features: {
      //       riskProfile: true,
      //       fundamentals: true,
      //       priceAction: true,
      //     }
      //   })
      // },
    )
  }

  function refreshView() {
    let value = localStorage.getItem("reckonData")
    if (value) {
      value = JSON.parse(value)
      updateFeatures(value)
    }
  }

  function displayPopup() {
    html = `
    <div id="box" style="
    cursor: pointer;
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    height: 70px;
    width: 153px;
    max-width: 450px;
    background: #fffffffc;
    z-index: 1000;
    box-shadow: 0 0 10px -4px #000;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    border-radius: 5px;
    flex-flow: column;
    box-sizing: border-box;
    padding: 0 1.2rem 0; opacity:0%; transition: 0.360s all cubic-bezier(0, 0, 0.2, 1) 0s; ">

  <h1 style="
    font-weight: bold;
    font-size: 8px;
    letter-spacing: 1px;
    color: gray;
    margin-right: 11px;
  ">Powered by</h1>

  <img src="https://reckon.live/logo.svg" style="
      width: 111px;margin-bottom: 5px;
  ">
  <span id="close" style="
  position: absolute;
  top: 4px;
  right: 10px;
  color: darkgray;
  transform: scale(1.2,0.9);
  font-weight: bold;
  opacity: 0;
  transition: 0.2s all cubic-bezier(0, 0, 0.2, 1) 0s;
">X</span>
  </div>

`
    popup = document.createElement('div')
    popup.innerHTML = html;
    popup.onclick = (e) => {
      if (e.target.id == "close") return;
      onPopupClick()
    }

    let box = popup.querySelector("#box")

    box.onmouseenter = (e) => {
      setTitle()
      setTimeout(() => {
        box.querySelector("#close").style.opacity = 1
      }, 1200)
    }
    box.onmouseleave = (e) => {
      box.querySelector("#close").style.opacity = 0
      setTimeout(() => {
        box.querySelector("#close").style.opacity = 0
      }, 1200)
    }

    document.body.append(popup)
    setTimeout(() => {
      box.style.opacity = 1
    }, 360)


    function removePopup() {
      box.style.opacity = 0
      setTimeout(() => {
        popup.remove()
      }, 360)
    }
    popup.querySelector("#close").onclick = removePopup


    function setTitle() {
      if (hasStoredData) {
        box.title = "Refresh Screen"
      } else {
        box.title = "Please Scan Portfolio First"

      }
    }
    setTitle()


  }


  function insertRecos() {
    portfolio = scrapePortfolio();
    chrome.runtime.sendMessage(
      message = {
        type: "GetPopupData",
        data:
          portfolio?.map((d) => ({
            portfolio: d.tradingsymbol,
            allocation_percentage: roundToDecimal(d.allocation, 1).toString(),
          }))
        ,
      },
      callback = (recos) => {
        console.log({ recos })
        updateFeatures({
          portfolio: recos,
          features: {
            riskProfile: true,
            fundamentals: true,
            priceAction: true,
          }
        })
      },
    )
  }

  function attachURLListner() {
    window.onpopstate = function (event) {
      // URL has changed
      console.log('URL changed:', window.location.href);
      if (window.location.href?.indexOf("kite.zerodha.com/holdings")) {
        insertRecos()
      }
    };
  }


  function onLoad() {
    displayPopup()
    // attachURLListner()
  }
  onLoad()



  // async function getRecos(){
  //   return fetch("https://api.reckon.live/api/portfolio/recommendations/", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       "data": "[{'portfolio':'DEEPAKNTR','allocation_percentage':'20'},{'portfolio':'HAPPSTMNDS','allocation_percentage':'13.3'},{'portfolio':'INFY','allocation_percentage':'14.9'},{'portfolio':'LIQUIDBEES','allocation_percentage':'0.1'},{'portfolio':'MTARTECH','allocation_percentage':'3.6'},{'portfolio':'NIFTYBEES','allocation_percentage':'5.1'},{'portfolio':'PERSISTENT','allocation_percentage':'17.1'},{'portfolio':'WABAG','allocation_percentage':'23.2'},{'portfolio':'ZOMATO','allocation_percentage':'2.6'}]",
  //       "email": "azillion646@gmail.com",
  //       "userId": "fb819300-0f27-4ebb-941a-c2046ad180db"

  //     }),
  //   }).then(console.log)
  // }
  // getRecos()
})();

// const getTime = t => {
//   var date = new Date(0);
//   date.setSeconds(t);

//   return date.toISOString().substr(11, 8);
// };

function getIcon(rule) {
  const ruleToIcons = {
    Rule19: "warn-triangle-orangered",
    Rule20: "warn-circle-orangered",
    Rule21: "warn-circle-yellow",
    Rule22: "warn-circle-yellow",
    Rule23: "dollar-circle-green",
    Rule24: "news--darkcyan",
    Rule25: "news--green",
    Rule26: "news--darkgreen",
    Rule27: "uptrend--orange",
    Rule28: "downtrend--orange",
    Rule29: "arrowupright--green",
    Rule30: "arrowdownright--orange",
    Rule31: "bars--green",
    Rule32: "risingmv--darkcyan",
    Rule33: "risingmnv--darkcyan",
    Rule34: "fallingmnv--darkcyan",
    Rule35: "fallingmv--darkcyan",
    RuleData1: "warn-circle-grey",
    RuleData2: "warn-circle-grey",
    RuleData3: "warn-circle-grey",
  };

  let icon = ruleToIcons[rule];
  // console.log({ rule, icon });
  let [iconType, shape, color] = icon.split("-");
  iconType = shape ? [iconType, shape].join("-") : iconType;
  color = color || "currentColor";
  // console.log({icon,iconType,color})

  switch (iconType) {
    case "chat":
      return `<svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="${color}"
    >
      <path
        d="M15 4a1 1 0 1 0 0 2V4zm0 11v-1a1 1 0 0 0-1 1h1zm0 4l-.707.707A1 1 0 0 0 16 19h-1zm-4-4l.707-.707A1 1 0 0 0 11 14v1zm-4.707-1.293a1 1 0 0 0-1.414 1.414l1.414-1.414zm-.707.707l-.707-.707.707.707zM9 11v-1a1 1 0 0 0-.707.293L9 11zm-4 0h1a1 1 0 0 0-1-1v1zm0 4H4a1 1 0 0 0 1.707.707L5 15zm10-9h2V4h-2v2zm2 0a1 1 0 0 1 1 1h2a3 3 0 0 0-3-3v2zm1 1v6h2V7h-2zm0 6a1 1 0 0 1-1 1v2a3 3 0 0 0 3-3h-2zm-1 1h-2v2h2v-2zm-3 1v4h2v-4h-2zm1.707 3.293l-4-4-1.414 1.414 4 4 1.414-1.414zM11 14H7v2h4v-2zm-4 0c-.276 0-.525-.111-.707-.293l-1.414 1.414C5.42 15.663 6.172 16 7 16v-2zm-.707 1.121l3.414-3.414-1.414-1.414-3.414 3.414 1.414 1.414zM9 12h4v-2H9v2zm4 0a3 3 0 0 0 3-3h-2a1 1 0 0 1-1 1v2zm3-3V3h-2v6h2zm0-6a3 3 0 0 0-3-3v2a1 1 0 0 1 1 1h2zm-3-3H3v2h10V0zM3 0a3 3 0 0 0-3 3h2a1 1 0 0 1 1-1V0zM0 3v6h2V3H0zm0 6a3 3 0 0 0 3 3v-2a1 1 0 0 1-1-1H0zm3 3h2v-2H3v2zm1-1v4h2v-4H4zm1.707 4.707l.586-.586-1.414-1.414-.586.586 1.414 1.414z"
      />
    </svg>`;

    case "warn-triangle":
      return `<svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="${color}"
      class="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
      />
    </svg>`;

    case "warn-circle":
      return `<svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="${color}"
      class="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
      />
    </svg>`;

    case "dollar-circle":
      return `<svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="${color}"
      class="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>`;

    case "news":
      return `<svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="${color}"
      class="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
      />
    </svg>`;

    case "uptrend":
      return `<svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="${color}"
      class="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
      />
    </svg>`;

    case "downtrend":
      return `<svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="${color}"
      class="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181"
      />
    </svg>`;

    case "arrowupright":
      return `<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="${color}"
      class="w-5 h-5"
    >
      <path
        fill-rule="evenodd"
        d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
        clip-rule="evenodd"
      />
    </svg>`;

    case "arrowdownright":
      return `<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="${color}"
      class="w-5 h-5"
    >
      <path
        d="M6.28 5.22a.75.75 0 00-1.06 1.06l7.22 7.22H6.75a.75.75 0 000 1.5h7.5a.747.747 0 00.75-.75v-7.5a.75.75 0 00-1.5 0v5.69L6.28 5.22z"
      />
    </svg>`;

    case "bars":
      return `<svg viewBox="85.017 255.787 63.913 46.184" width="20" height="20">
      <path
        fill="${color}"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M 85.017 266.085 C 85.017 263.961 86.807 262.238 89.011 262.238 L 97.001 262.238 C 99.206 262.238 100.996 263.961 100.996 266.085 L 100.996 298.123 C 100.996 300.247 99.206 301.971 97.001 301.971 L 89.011 301.971 C 86.803 301.971 85.017 300.247 85.017 298.123 L 85.017 266.085 Z M 108.985 259.636 C 108.985 257.512 110.774 255.787 112.979 255.787 L 120.968 255.787 C 123.173 255.787 124.963 257.512 124.963 259.636 L 124.963 298.123 C 124.963 300.247 123.173 301.971 120.968 301.971 L 112.979 301.971 C 110.77 301.971 108.985 300.247 108.985 298.123 L 108.985 259.636 Z M 132.952 261.706 C 132.952 259.581 134.741 257.858 136.946 257.858 L 144.935 257.858 C 147.14 257.858 148.93 259.581 148.93 261.706 L 148.93 298.123 C 148.93 300.247 147.14 301.971 144.935 301.971 L 136.946 301.971 C 134.738 301.971 132.952 300.247 132.952 298.123 L 132.952 261.706 Z"
        style=""
      ></path>
    </svg>`;

    case "risingmv":
      return `<svg viewBox="231.046 147.788 98.42 99.47" >
      <path
        fill="${color}"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M 231.046 214.949 C 231.046 212.402 233.802 210.335 237.197 210.335 L 249.5 210.335 C 252.895 210.335 255.651 212.402 255.651 214.949 L 255.651 242.643 C 255.651 245.19 252.895 247.258 249.5 247.258 L 237.197 247.258 C 233.796 247.258 231.046 245.19 231.046 242.643 L 231.046 214.949 Z M 267.954 196.488 C 267.954 193.94 270.709 191.872 274.105 191.872 L 286.407 191.872 C 289.803 191.872 292.559 193.94 292.559 196.488 L 292.559 242.643 C 292.559 245.19 289.803 247.258 286.407 247.258 L 274.105 247.258 C 270.704 247.258 267.954 245.19 267.954 242.643 L 267.954 196.488 Z M 304.861 178.026 C 304.861 175.478 307.617 173.411 311.012 173.411 L 323.315 173.411 C 326.71 173.411 329.466 175.478 329.466 178.026 L 329.466 242.643 C 329.466 245.19 326.71 247.258 323.315 247.258 L 311.012 247.258 C 307.611 247.258 304.861 245.19 304.861 242.643 L 304.861 178.026 Z"
        style=""
      ></path>
      <path
        fill="${color}"
        fill-rule="evenodd"
        d="M 258.153 181.601 C 259.166 182.614 260.805 182.614 261.818 181.601 L 286.78 156.639 L 286.78 176.311 C 286.78 178.31 288.941 179.557 290.669 178.559 C 291.472 178.096 291.966 177.238 291.966 176.311 L 291.966 150.381 C 291.966 148.95 290.804 147.788 289.373 147.788 L 263.443 147.788 C 261.448 147.788 260.2 149.949 261.196 151.678 C 261.659 152.48 262.517 152.974 263.443 152.974 L 283.116 152.974 L 258.153 177.936 C 257.144 178.949 257.144 180.591 258.153 181.601 Z"
        clip-rule="evenodd"
        style=""
      ></path>
    </svg>`;

    case "risingmnv":
      return `<svg viewBox="231.046 147.788 98.42 99.47">
      <path
        fill="${color}"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M 231.046 205.72 C 231.046 208.267 233.802 210.334 237.197 210.334 L 249.5 210.334 C 252.895 210.334 255.651 208.267 255.651 205.72 L 255.651 178.026 C 255.651 175.479 252.895 173.411 249.5 173.411 L 237.197 173.411 C 233.796 173.411 231.046 175.479 231.046 178.026 L 231.046 205.72 Z M 267.954 224.181 C 267.954 226.729 270.709 228.797 274.105 228.797 L 286.407 228.797 C 289.803 228.797 292.559 226.729 292.559 224.181 L 292.559 178.026 C 292.559 175.479 289.803 173.411 286.407 173.411 L 274.105 173.411 C 270.704 173.411 267.954 175.479 267.954 178.026 L 267.954 224.181 Z M 304.861 242.643 C 304.861 245.191 307.617 247.258 311.012 247.258 L 323.315 247.258 C 326.71 247.258 329.466 245.191 329.466 242.643 L 329.466 178.026 C 329.466 175.479 326.71 173.411 323.315 173.411 L 311.012 173.411 C 307.611 173.411 304.861 175.479 304.861 178.026 L 304.861 242.643 Z"
        style=""
        transform="matrix(-1, 0, 0, -1, 560.512012, 420.668967)"
      ></path>
      <path
        fill="${color}"
        fill-rule="evenodd"
        d="M 269.902 181.601 C 270.915 182.614 272.554 182.614 273.567 181.601 L 298.529 156.639 L 298.529 176.311 C 298.529 178.31 300.69 179.557 302.418 178.559 C 303.221 178.096 303.715 177.238 303.715 176.311 L 303.715 150.381 C 303.715 148.95 302.553 147.788 301.122 147.788 L 275.192 147.788 C 273.197 147.788 271.949 149.949 272.945 151.678 C 273.408 152.48 274.266 152.974 275.192 152.974 L 294.865 152.974 L 269.902 177.936 C 268.893 178.949 268.893 180.591 269.902 181.601 Z"
        clip-rule="evenodd"
        style=""
      ></path>
    </svg>`;

    case "fallingmnv":
      return `<svg viewBox="265.608 201.728 98.42 99.668">
      <path
        fill="${color}"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M 265.608 289.046 C 265.608 291.593 268.364 293.66 271.759 293.66 L 284.062 293.66 C 287.457 293.66 290.213 291.593 290.213 289.046 L 290.213 250.625 C 290.213 248.078 287.457 246.01 284.062 246.01 L 271.759 246.01 C 268.358 246.01 265.608 248.078 265.608 250.625 L 265.608 289.046 Z M 302.516 296.78 C 302.516 299.328 305.271 301.396 308.667 301.396 L 320.969 301.396 C 324.365 301.396 327.121 299.328 327.121 296.78 L 327.121 250.625 C 327.121 248.078 324.365 246.01 320.969 246.01 L 308.667 246.01 C 305.266 246.01 302.516 248.078 302.516 250.625 L 302.516 296.78 Z M 339.423 294.298 C 339.423 296.846 342.179 298.913 345.574 298.913 L 357.877 298.913 C 361.272 298.913 364.028 296.846 364.028 294.298 L 364.028 250.625 C 364.028 248.078 361.272 246.01 357.877 246.01 L 345.574 246.01 C 342.173 246.01 339.423 248.078 339.423 250.625 L 339.423 294.298 Z"
        style=""
        transform="matrix(-1, 0, 0, -1, 629.635972, 547.405994)"
      ></path>
      <path
        fill="${color}"
        fill-rule="evenodd"
        d="M 298.138 202.488 C 299.151 201.475 300.79 201.475 301.803 202.488 L 326.765 227.45 L 326.765 207.778 C 326.765 205.779 328.926 204.532 330.654 205.53 C 331.457 205.993 331.951 206.851 331.951 207.778 L 331.951 233.708 C 331.951 235.139 330.789 236.301 329.358 236.301 L 303.428 236.301 C 301.433 236.301 300.185 234.14 301.181 232.411 C 301.644 231.609 302.502 231.115 303.428 231.115 L 323.101 231.115 L 298.138 206.153 C 297.129 205.14 297.129 203.498 298.138 202.488 Z"
        clip-rule="evenodd"
        style=""
      ></path>
    </svg>`;

    case "fallingmv":
      return `<svg viewBox="231.046 146.766 98.42 100.492">
      <path
        fill="${color}"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M 231.046 205.72 C 231.046 208.267 233.802 210.334 237.197 210.334 L 249.5 210.334 C 252.895 210.334 255.651 208.267 255.651 205.72 L 255.651 178.026 C 255.651 175.479 252.895 173.411 249.5 173.411 L 237.197 173.411 C 233.796 173.411 231.046 175.479 231.046 178.026 L 231.046 205.72 Z M 267.954 224.181 C 267.954 226.729 270.709 228.797 274.105 228.797 L 286.407 228.797 C 289.803 228.797 292.559 226.729 292.559 224.181 L 292.559 178.026 C 292.559 175.479 289.803 173.411 286.407 173.411 L 274.105 173.411 C 270.704 173.411 267.954 175.479 267.954 178.026 L 267.954 224.181 Z M 304.861 242.643 C 304.861 245.191 307.617 247.258 311.012 247.258 L 323.315 247.258 C 326.71 247.258 329.466 245.191 329.466 242.643 L 329.466 178.026 C 329.466 175.479 326.71 173.411 323.315 173.411 L 311.012 173.411 C 307.611 173.411 304.861 175.479 304.861 178.026 L 304.861 242.643 Z"
        style=""
        transform="matrix(-1, 0, 0, -1, 560.512012, 420.668997)"
      ></path>
      <path
        fill="${color}"
        fill-rule="evenodd"
        d="M 269.902 147.526 C 270.915 146.513 272.554 146.513 273.567 147.526 L 298.529 172.488 L 298.529 152.816 C 298.529 150.817 300.69 149.57 302.418 150.568 C 303.221 151.031 303.715 151.889 303.715 152.816 L 303.715 178.746 C 303.715 180.177 302.553 181.339 301.122 181.339 L 275.192 181.339 C 273.197 181.339 271.949 179.178 272.945 177.449 C 273.408 176.647 274.266 176.153 275.192 176.153 L 294.865 176.153 L 269.902 151.191 C 268.893 150.178 268.893 148.536 269.902 147.526 Z"
        clip-rule="evenodd"
        style=""
      ></path>
    </svg>`;

    default:
      return `<span :title="iconType" fill="${color}">👉</span>`;
  }
}
