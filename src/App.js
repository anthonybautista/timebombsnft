import React, { useEffect } from 'react';
import logo from './logo-large.png';
import './App.css';
import { ethers } from 'ethers';
import gif from "./TIME_BOMBs.gif";
import bomb1 from "./bomb1.png";
import bomb2 from "./bomb2.png";
import bomb3 from "./bomb3.png";
import bomb4 from "./bomb4.png";
import villain from "./villain.png";
import xrpant from "./xrpant.jpg";
import snowbound from "./snowbound.jpg";
import thevert from "./thevert.jpg";
import twitter from "./twitter.png";
import discord from "./discord.png";
import three from "./3.png";
import fourteen from "./14.png";
import eightynine from "./89.png";
import $ from 'jquery';
import NFT from './nft-abi.json';

function App() {
    const NFT_ADDRESS = "0x8B4C4A3407E9a1eFF4863DA752C54e8c430274c3";
    let myBombTokenIds = [];
    let myBombIndex = 1;
    let gameState = true;
    let y;
    let provider
    let signer
    let currentNetwork
    const defaultNetwork = '0xa86a'
    const { ethereum } = window;

    /* web3 code borrowed and modified from ftso.alexdupre.com */
    const networks = {
        '0xa86a': {
            chainId: '0xa86a',
            chainName: 'Avalanche',
            nativeCurrency: { decimals: 18, symbol: 'AVAX' },
            rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
            blockExplorerUrls: ['https://snowtrace.io'],
        },
    }

    async function checkWeb3() {
        if (typeof window.ethereum !== 'undefined') {
            console.log('Web3 provider is installed!')
            provider = new ethers.providers.Web3Provider(window.ethereum)
            signer = provider.getSigner()
            try {
                // check if already connected by getting the wallet address
                await signer.getAddress()
                await checkNetwork()
                await checkAccount()
                $("button#connect").html('Connected').css("background", "rgb(215, 0, 0)");
                $("button#connect").prop('disabled', true);
                getMinted();
            } catch (err) {
                console.log(err)
            }
        } else {
            console.log('Please install MetaMask or another web3 provider!')
            alert('Please install MetaMask or another web3 provider!')
        }
    }

    async function connect() {
        console.log("Connecting...")
        $("p#bombError").text(``);

        $("button#connect").prop('disabled', true);
        try {
            // connect
            await ethereum.request({ method: 'eth_requestAccounts' });
            await checkNetwork();
            await checkAccount();
            console.log("Connected.");
            $("button#connect").html('Connected').css("background", "rgb(215, 0, 0)");
            getMinted();
        } catch (err) {
            $("button#connect").prop('disabled', false);
            if (err.code === 4001) {
                // user rejected the connection
                console.log('Please connect to MetaMask.');
            } else {
                console.error(err);
            }
            $("p#bombError").text(`${err}`);
        }
    }

    async function checkNetwork() {
        ethereum.on('chainChanged', handleChainChanged);
        let chainId = await ethereum.request({ method: 'eth_chainId' })
        if (networks[chainId] !== undefined) {
            currentNetwork = networks[chainId]
            //await handleChainChanged(chainId)
        } else if (ethereum.isMetaMask) {
            await setupNetwork(defaultNetwork)
            if (chainId === await ethereum.request({ method: 'eth_chainId' }))
                console.log('Please switch to one of the supported networks.')
        } else {
            console.log('Please switch to one of the supported networks.')
        }
    }

    async function checkAccount() {
        let accounts = await ethereum.request({ method: 'eth_accounts' })
        ethereum.on('accountsChanged', handleAccountsChanged)

    }

    async function setupNetwork(network) {
        try {
            await ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: networks[network].chainId }],
            });
        } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
                try {
                    await ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [networks[network]],
                    });
                } catch (addError) {
                    if (addError.code === 4001) {
                        console.log('Please approve the Avalanche network.')
                    } else {
                        // handle other "add" errors
                        console.error(addError)
                    }
                }
            } else if (switchError.code === 4001) {
                // user rejected the change
                console.log('Avalanche configuration already present.')
            } else {
                // handle other "switch" errors
                console.error(switchError)
            }
        }
        provider = new ethers.providers.Web3Provider(window.ethereum)
        signer = provider.getSigner()
    }


    async function handleChainChanged(chainId) {
        //window.location.reload()
        console.log("Chain changed to " + chainId)
        $("p#bombError").text(``);
        currentNetwork = networks[chainId]
        // reload provider and signer on chain change
        provider = new ethers.providers.Web3Provider(window.ethereum)
        signer = provider.getSigner()
        if (currentNetwork !== undefined) {
            // show main section
        } else {
            // reload or ask to change network
            console.log('Please switch to one of the supported networks.')
            $("p#bombError").text(`Wrong Network`);
        }
    }

    async function handleAccountsChanged(accounts) {
        //window.location.reload()
        console.log('Account changed to ' + accounts)
        if (accounts.length === 0) {
            // MetaMask is locked or the user has not connected any accounts
        }
    }

    const mintNftHandler = () => { }

    const connectWalletButton = () => {
      return (
          <button id={'connect'} className='cta-button connect-wallet-button'>
            Connect
          </button>
      )
    }

    const myBombsButton = () => {
        return (
            <button id={'myBombs'} className='cta-button connect-wallet-button'>
                My Bombs
            </button>
        )
    }

    const BVOButton = () => {
        return (
            <button id={'BVO'} className='cta-button connect-wallet-button'>
                BVO
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

    const gameplayButton = () => {
        return (
            <button id={'gameplay'} className='cta-button connect-wallet-button'>
                Gameplay
            </button>
        )
    }

    const roadmapButton = () => {
        return (
            <button id={'roadmap'} className='cta-button connect-wallet-button'>
                Roadmap
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
        let rules = `<div class="smallBox">
            <h2>Gameplay</h2>
            </div>
            <div class="contentBox">
            <ul>
                <li>
                    <div class="list">
                        <img src=${bomb1} class="bomb" alt="Bomb" />
                        <span>85% of mint sales will be used to purchase a yield-bearing asset chosen by the
                              community.</span>
                    </div>
                </li>
                <br/>
                <li>
                    <div class="list">
                        <img src=${bomb2} class="bomb" alt="Bomb" />
                        <span>Once the game starts, all bombs will have 24 hours to be 'reset'. Resetting your bomb
                              has a 20% chance of causing detonation.</span>
                    </div>
                </li>
                <br/>
                <li>
                    <div class="list">
                        <img src=${bomb3} class="bomb" alt="Bomb" />
                        <span>Once reset, the timer will immediately begin counting down again from 24 hours. 
                              If your 24-hour timer runs out, the bomb is detonated.</span>
                    </div>
                </li>
                <br/>
                <li>
                    <div class="list">
                        <img src=${bomb4} class="bomb" alt="Bomb" />
                        <span>When there are only 3 active bombs left, anyone can halt the game and the owners of the
                              remaining bombs can collect their share of the prize pool.</span>
                    </div>
                </li>
            </ul>
        </div>`;

        return rules;
    }

    function returnRoadmap() {
        let roadmap = `<div class="smallBox">
            <h2>Roadmap</h2>
            </div>
            <div class="contentBox">
                <h2 class="underlined">Round 1</h2>
                <p>Round 1 will begin shortly after all 999 TIMEBOMBs have been minted.</p>
                <p class="underlined">Proceeds will be divided as follows:</p>
                <p>Prize Pool: 85%</p>
                <p>Developer: 9%</p>
                <p>Community Manager: 2.5%</p>
                <p>Art for Round 2: 2.5%</p>
                <p>BOMB VILLAIN ORACLE: 1%</p>
                <br/>
                <h2 class="underlined">Round 2</h2>
                <p>Round 2 artwork is already in progress. Round two will 
                   be a collection of 3,333 unique TIMEBOMBs.</p>
                <p>All Round 1 bombs will be eligible to participate in Round 2.</p>
            </div>`;

        return roadmap;
    }

    function returnBVO() {
        let bombVO = `<img id="villain" src=${villain} alt="Villain"/>
            <div class="smallBox">
            <h2>Bomb Villain Oracle</h2>
            </div>
            <div class="contentBox">
                <h2 class="underlined">Send Detonation Code</h2>
                <p>Enter a number between 0-65000</p>
                <input  id="bvoInput" type="number" min="0" max="65000">
                <button onClick={sendBVO} class='cta-button connect-wallet-button'>Send</button>                
                <p>Sending detonation codes helps contribute to game randomness.</p>
                <p>The last 10 submitted numbers are eligible to be selected. If your number causes a
                   bomb to detonate you earn points. Villains with the most points will win a prize!</p>
                <p>Points given will be equal to the number of bombs left - 999, meaning you get more
                   points when there are less bombs left, but the chance to take out multiple bombs is
                   higher early on!</p>
                <a href="https://www.timebombsnft.com/Timebombs_NFT_-_Bomb_Villain_Oracle" target="_blank" rel="noreferrer">
                    BVO Whitepaper
                </a> 
            </div>
            <div class="contentBox">
                <h2 class="underlined">Villain Leaderboard</h2>
                <ul id="villainLeaderboard">
                    <li class="underlined">Wallet</li><span class="leaderPoints underlined">Points</span>
                </ul>
                <br/>
            </div>`;

        return bombVO;
    }

    function homeContent() {
        let collage = `<div><img src="${gif}" alt="Collage of TIMEBOMBS"/><br/></div>`;
        let mintDiv = `<div id="mint"><h3>Bombs Minted</h3><p id="bombError"></p><p><span id="bombsMinted">0</span> / 999</p>
        <div id={'mintNftButton'}><button onClick={mintNftHandler} class='cta-button connect-wallet-button'>
        Mint NFT</button><p>Price: 1 AVAX</p></div></div>`;
        return collage+mintDiv;
    }

    function gameplayContent() {
        let rules = returnRules();
        return rules;
    }

    function roadmapContent() {
        let roadmap = returnRoadmap();
        return roadmap;
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
                        <p id="bombsLeft">${bombsLeft}</p>
                        <p>Bombs Left</p>
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
            <p id="myBombNumbers"><span id="leftArrow">&larr;</span>  ${index} / ${numBombs}  <span id="rightArrow">&rarr;</span></p>
            <div><img class="bombIMG" src="${URI}" alt="TIMEBOMB #${myBombTokenIds[index-1]}"/><br/></div>
            <p>Bomb Status: <span id="bombState"></span></p>
            <div id="countdownClock">24:00:00</div>
            <button onClick={resetTimer()} class='cta-button connect-wallet-button'>
                        Reset Timer</button>
        </div>`;

    }

    function resetTimer() {}

    function refreshStatus() {}

    function haltGame() {}

    function sendBVO() {}

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
    function startClock() {
        // Set the date we're counting down to
        let countDownDate = new Date().getTime() + (24 * 60 * 60 * 1000);
        if (!gameState) {
            document.getElementById("bombState").innerHTML = "Game Over.";
            document.getElementById("countdownClock").innerHTML = "GAME OVER";
            return;
        } else if (countDownDate > 0) {
            document.getElementById("bombState").innerHTML = "Countdown Active!";
        }
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
                document.getElementById("bombState").innerHTML = "Boom!";
                document.getElementById("countdownClock").innerHTML = "DETONATED";
            }
        }, 1000);
    }

    function clearTimers() {
        clearInterval(y);
    }

    const getMinted = async () => {
        const { ethereum } = window;

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(NFT_ADDRESS, NFT, signer);

        let nMinted = await connectedContract.totalSupply();

        $("span#bombsMinted").text(`${nMinted}`);

        if (nMinted === 999) {
            $("button#mint").prop('disabled', true);
        }
    }

    useEffect(() => {
      checkWeb3();
    }, [])

    $(function() {
        $("button#home").off().on("click", function(event) {
            event.preventDefault();
            clearTimers();
            $("div#content").empty();
            $("div#content").html(homeContent());
            getMinted();
        })
        $("button#gameplay").off().on("click", function(event) {
            event.preventDefault();
            clearTimers();
            $("div#content").empty();
            $("div#content").html(gameplayContent());
        })
        $("button#roadmap").off().on("click", function(event) {
            event.preventDefault();
            clearTimers();
            $("div#content").empty();
            $("div#content").html(roadmapContent());
        })
        $("button#myBombs").off().on("click", function(event) {
            event.preventDefault();
            clearTimers();
            $("div#content").empty();
            $("div#content").html(myBombs());
            startClock();
        })
        $("button#BVO").off().on("click", function(event) {
            event.preventDefault();
            clearTimers();
            $("div#content").empty();
            $("div#content").html(returnBVO());
        })
        $("button#connect").off().on("click", function(event) {
            event.preventDefault();
            connect();
        })
        $(".App").off().on('click', '#leftArrow', function () {
            if (myBombIndex > 1) {
                myBombIndex -= 1;
                $("div#myBombsBoxWrapper").html(myBombStats(myBombIndex));
                clearTimers();
                startClock();
            }
        })
        $("#content").off().on('click', '#rightArrow', function () {
            if (myBombIndex < myBombTokenIds.length) {
                myBombIndex += 1;
                $("div#myBombsBoxWrapper").html(myBombStats(myBombIndex));
                clearTimers();
                startClock();
            }
        })
        $("#content").css("padding-top", $("#headerBar").height());

    });


  return (
    <div className="App">
        <div id={'headerBar'}>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="TIMEBOMBS logo" />
            <p id={'tagline'}>
              999 NFTs waiting to explode on Avalanche.
            </p>
            <div id={'socialBar'}>
                <a href="https://twitter.com/timebombs_nft" target="_blank" rel="noreferrer">
                    <img src={twitter} alt={'Twitter logo'} />
                </a>
                <a href="https://discord.gg/Wrx7a9ceFZ" target="_blank" rel="noreferrer">
                    <img src={discord} alt={'Discord logo'} />
                </a>
            </div>
            <div id={'navBar'}>
                <div id={'homeButton'}>
                    {homeButton()}
                </div>
                <div id={'myBombsButton'}>
                    {myBombsButton()}
                </div>
                <div id={'BVOButton'}>
                    {BVOButton()}
                </div>
                <div id={'gameplayButton'}>
                    {gameplayButton()}
                </div>
                <div id={'roadmapButton'}>
                    {roadmapButton()}
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
                <p>Price: 1 AVAX</p>
            </div>
        </div>
        <div id={'team'}>
            <h2>Built by Apes</h2>
            <img src={xrpant} alt={'Avax Ape 931'} />
            <h3>xrpant - dev</h3>
            <img src={snowbound} alt={'Avax Ape 7235'} />
            <h3>OG Snowbound - Community Manager</h3>
            <img src={thevert} alt={'Avax Ape 2194'} />
            <h3>Thévert - Round 2 Art</h3>
        </div>
        <div id={'buffer'}></div>
    </div>
  );
}

export default App;
