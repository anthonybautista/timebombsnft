import React from 'react';
import logo from './logo-large.png';
import './App.css';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import gif from "./TIME_BOMBs.gif";
import bomb from "./bomb.png";
import three from "./3.png";
import fourteen from "./14.png";
import eightynine from "./89.png";
import $ from 'jquery';
/* import contract from './contracts/NFTCollectible.json'; */

function App() {
  /*const contractAddress = "0x355638a4eCcb777794257f22f50c289d4189F245";
  const abi = contract.abi;*/

    let myBombTokenIds = [];

    let myBombIndex = 1;

    let x;

    let y;

    const checkWalletIsConnected = () => { }

    const connectWalletHandler = () => { }

    const mintNftHandler = () => { }

    const connectWalletButton = () => {
      return (
          <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
            Connect
          </button>
      )
    }

    const myBombsButton = () => {
        return (
            <button onClick={connectWalletHandler} id={'myBombs'} className='cta-button connect-wallet-button'>
                My Bombs
            </button>
        )
    }

    const homeButton = () => {
        return (
            <button id={'home'} className='cta-button connect-wallet-button'>
                Home
            </button>
        )
    }

    const mintNftButton = () => {
      return (
          <button onClick={mintNftHandler} className='cta-button connect-wallet-button'>
            Mint NFT
          </button>
      )
    }

    function returnRules() {
        let rules = `<div class="contentBox">
            <h3>Gameplay</h3>
            <ul>
                <li>
                    <div class="list">
                        <img src=${bomb} class="bomb" alt="Bomb" />
                        <span>85% of mint sales will be used to bond for TIME, and converted to wMEMO.</span>
                    </div>
                </li>
                <br/>
                <li>
                    <div class="list">
                        <img src=${bomb} class="bomb" alt="Bomb" />
                        <span>Once the game starts, all bombs will have 24 hours to be 'reset'. Resetting your bomb
                              has a 10% chance of causing detonation.</span>
                    </div>
                </li>
                <br/>
                <li>
                    <div class="list">
                        <img src=${bomb} class="bomb" alt="Bomb" />
                        <span>Once reset, there will be a 24 hour delay until a new 24 hour timer starts. If your 24 hour
                              timer runs out, the bomb is detonated.</span>
                    </div>
                </li>
                <br/>
                <li>
                    <div class="list">
                        <img src=${bomb} class="bomb" alt="Bomb" />
                        <span>When there are only 3 active bombs left, anyone can halt the game and the owners of the
                              remaining bombs can collect their share of the wMEMO.</span>
                    </div>
                </li>
            </ul>
        </div>`;

        return rules;
    }

    function homeContent() {
        let collage = `<div><img src="${gif}" alt="Collage of TIMEBOMBS"/><br/></div>`;
        let mintDiv = `<div id="mint"><h3>Bombs Minted</h3><p id="bombError"></p><p><span id="bombsMinted">0</span> / 999</p>
        <div id={'mintNftButton'}><button onClick={mintNftHandler} class='cta-button connect-wallet-button'>
        Mint NFT</button></div></div>`;
        let rules = returnRules();
        return collage+mintDiv+rules;
    }

    function myBombs() {
        getBombTokenIds();
        let status = bombStatus();
        let myBombs = myBombStats(myBombIndex);
        return status+`<div id="myBombsBoxWrapper">`+myBombs+`</div>`;
    }

    function bombStatus() {
        /* need to get data here */
        let bombsLeft = 420;

        return `<div id="statusBox">
                    <div id="statusLeft">
                        <h3>Bombs Left</h3>
                        <p id="bombsLeft">${bombsLeft}</p>
                    </div>
                    <div id="statusRight">
                        <button onClick={refreshStatus()} class='cta-button connect-wallet-button'>
                        Refresh</button>
                        <button onClick={haltGame()} class='cta-button connect-wallet-button'>
                        Halt Game</button>
                    </div>
                </div>`;
    }

    function myBombStats(index) {
        /* need to get bomb stats here */
        let numBombs = myBombTokenIds.length;
        /* get bomb tokenIds owned */
        let URI = getTokenURI(index)
        /* need to get time until countdown */

        return `
        <div id="myBombsBox">
            <h3>My Bombs</h3>
            <p><span id="leftArrow">&larr;</span> ${index} / ${numBombs} <span id="rightArrow">&rarr;</span></p>
            <div><img src="${URI}" alt="TIMEBOMB #${myBombTokenIds[index-1]}"/><br/></div>
            <p>Time until timer starts: <span id="timeUntilCountdown"></span></p>
            <div id="countdownClock">24:00:00</div>
            <button onClick={resetTimer()} class='cta-button connect-wallet-button'>
                        Reset Timer</button>
        </div>`;

    }

    function resetTimer() {}

    function refreshStatus() {}

    function haltGame() {}

    function getBombTokenIds() {
        /* need to get token ids */
        myBombTokenIds = [3,14,89];
    }

    function getTokenURI(index) {
        /* need to get URI
        return `/src/${tokenId}.png`*/
        let tokenId = myBombTokenIds[index-1];

        if (tokenId === 3) {
            return `${three}`
        } else if (tokenId === 14) {
            return `${fourteen}`
        } else if (tokenId === 89) {
            return `${eightynine}`
        }
    }

    /* countdown code taken from w3schools */
    function startCountdown() {
        // Set the date we're counting down to
        let countDownDate = new Date().getTime()+(.1*60*1000);

        // Update the count down every 1 second
        x = setInterval(function() {

            // Get today's date and time
            let now = new Date().getTime();

            // Find the distance between now and the count down date
            let distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Display the result in the element with id="demo"
            document.getElementById("timeUntilCountdown").innerHTML = hours + "h "
                + minutes + "m " + seconds + "s ";

            // If the count down is finished, write some text
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("timeUntilCountdown").innerHTML = "In Progress";
                startClock();
            }
        }, 1000);
    }

    /* countdown code taken from w3schools */
    function startClock() {
        // Set the date we're counting down to
        let countDownDate = new Date().getTime()+(24*60*60*1000);

        // Update the count down every 1 second
        y = setInterval(function() {

            // Get today's date and time
            let now = new Date().getTime();

            // Find the distance between now and the count down date
            let distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Display the result in the element with id="demo"
            document.getElementById("countdownClock").innerHTML = hours + ":"
                + minutes + ":" + seconds;

            // If the count down is finished, write some text
            if (distance < 0) {
                clearInterval(y);
                document.getElementById("countdownClock").innerHTML = "Bomb Detonated";
            }
        }, 1000);
    }

    function clearTimers() {
        clearInterval(x);
        clearInterval(y);
    }

    useEffect(() => {
      checkWalletIsConnected();
    }, [])

    $(function() {
        $("button#home").off().on("click", function(event) {
            event.preventDefault();
            clearTimers();
            $("div#content").empty();
            $("div#content").html(homeContent());
        })
        $("button#myBombs").off().on("click", function(event) {
            event.preventDefault();
            $("div#content").empty();
            $("div#content").html(myBombs());
            startCountdown();
        })
        $(".App").off().on('click', '#leftArrow', function () {
            if (myBombIndex > 1) {
                myBombIndex -= 1;
                $("div#myBombsBoxWrapper").html(myBombStats(myBombIndex));
                clearTimers();
                startCountdown();
            }
        })
        $("#content").off().on('click', '#rightArrow', function () {
            if (myBombIndex < myBombTokenIds.length) {
                myBombIndex += 1;
                $("div#myBombsBoxWrapper").html(myBombStats(myBombIndex));
                clearTimers();
                startCountdown();
            }
        })
    });


  return (
    <div className="App">
        <div id={'headerBar'}>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="TIMEBOMBS logo" />
            <p id={'tagline'}>
              999 NFTs waiting to explode on Avalanche.
            </p>
            <div id={'navBar'}>
                <div id={'homeButton'}>
                    {homeButton()}
                </div>
                <div id={'myBombsButton'}>
                    {myBombsButton()}
                </div>
                <div id={'connectButton'}>
                    {connectWalletButton()}
                </div>
            </div>
          </header>
        </div>
        <div id={'content'}>
            <div>
                <img src={gif} alt={'Collage of TIMEBOMBS'}/>
                <br/>
            </div>
            <div id="mint">
                <h3>Bombs Minted</h3>
                <p id="bombError"></p>
                <p><span id="bombsMinted">0</span> / 999</p>
                <div id={'mintNftButton'}>
                    {mintNftButton()}
                </div>
            </div>
            <div className="contentBox">
                <h3>Gameplay</h3>
                <ul>
                    <li>
                        <div className="list">
                            <img src={bomb} className="bomb" alt="Bomb"/>
                            <span>85% of mint sales will be used to bond for TIME, and converted to wMEMO.</span>
                        </div>
                    </li>
                    <br/>
                    <li>
                        <div className="list">
                            <img src={bomb} className="bomb" alt="Bomb"/>
                            <span>Once the game starts, all bombs will have 24 hours to be 'reset'. Resetting your bomb
                          has a 10% chance of causing detonation.</span>
                        </div>
                    </li>
                    <br/>
                    <li>
                        <div className="list">
                            <img src={bomb} className="bomb" alt="Bomb"/>
                            <span>Once reset, there will be a 24 hour delay until a new 24 hour timer starts. If your 24 hour
                          timer runs out, the bomb is detonated.</span>
                        </div>
                    </li>
                    <br/>
                    <li>
                        <div className="list">
                            <img src={bomb} className="bomb" alt="Bomb"/>
                            <span>When there are only 3 active bombs left, anyone can halt the game and the owners of the
                          remaining bombs can collect their share of the wMEMO.</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  );
}

ReactDOM.render(
    <React.StrictMode>
        <div id={'container'}>
            <App />
        </div>
    </React.StrictMode>,
    document.getElementById('root')
);

export default App;
