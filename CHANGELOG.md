# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## Unreleased

## [7.20.5] - 2024-02-08
### Fixed
- on invalid fetcher, display error but do not halt the worker

## [7.20.4] - 2024-01-29
### Fixed
- fix `CryptoCompareMultiProcessor`: support case where id of feed might be in different case than feed name

## [7.20.3] - 2023-11-21
### Fixed
- MultiversX: hash key for `getManyPriceDataRaw`

## [7.20.2] - 2023-11-20
### Changed
- remove last `/` from RPC

## [7.20.1] - 2023-11-20
### Added
- display network id on info

## [7.20.0] - 2023-11-17
### Added
- display all on-chain triggers in API response
- global flag for uniswap status

### Fixed
- small code fixes for repositories

## [7.19.7] - 2023-11-17
### Changed
- better logs

## [7.19.6] - 2023-11-16
### Changed
- trunk gas after multiplication
- logs cleanup

## [7.19.5] - 2023-11-16
### Removed
- remove max gas setting

## [7.19.4] - 2023-11-16
### Removed
- revert RPC estimation to be bale to use higher max gas

## [7.19.3] - 2023-11-16
### Added
- dump consensus data on error

## [7.19.2] - 2023-11-16
### Added
- option to override `maxFeePerGas` and `maxPriorityFeePerGas`

### Removed
- removed `massa` code

## [7.19.0] - 2023-11-10
### Changed
- change app type to `ES Module`
- update typescript to v5

## [7.18.2] - 2023-11-07
### Fix
- check for empty string

## [7.18.1] - 2023-11-07
### Removed
- `newrelic.js` file
- `name` from settings

### Changed
- print `id` in `BlockchainProviderFactory`

## [7.18.0] - 2023-11-06
## Added
- support Massa for on-chain data

## Changed
- add support for `\\n` for MultiversX PK

## [7.17.0] - 2023-11-01
## Changed
- disable uniswap agent if there are no settings

## [7.16.2] - 2023-09-29
## Removed
- removed deprecated master chain settings

## [7.16.1] - 2023-09-29
### Fixed
- multiversx fixes
  - order signtures
  - constant network ID
  - user proper feed contract
  - cast price to bigint
  - wait for tx
  - tx cost

## [7.16.0] - 2023-09-21
### Added
- TWAP gas price fetcher

### Removed
- new relic

## [7.15.1] - 2023-09-12
### Changed
- make `/info` default "ping" endpoint

## [7.15.0] - 2023-09-12
### Added
- non evm support for on-chain solution

### Removed
- general `BLOCKCHAIN_PROVIDER_URL` and `BLOCKCHAIN_PROVIDER_URLS` env, used for BSC, TODO: cleanup tech-ops
- solana related code

## [7.14.0] - 2023-08-03
### Added
- support for base blockchain for on-chain solution

## [7.13.1] - 2023-08-01
### Fixed
- fix version number

## [7.13.0] - 2023-08-01
### Added
- option to set multiplier for gas

## [7.12.0] - 2023-07-26
### Changed
- explicit use current nonce when sending tx

### Updated
- feeds contract abi

## [7.11.5] - 2023-07-25
### Fixed
- fix gas estimation for arbitrum dispatcher

## [7.11.4] - 2023-07-16
### Removed
- remove displaying error message for BNB in `/info` endpoint

## [7.11.3] - 2023-07-15
### Changed
- pull list of validators from any blockchain to check the leader

## [7.11.2] - 2023-07-14
### Changed
- order validators addresses alphabetically

## [7.11.1] - 2023-07-13
### Changed
- do not run `MetricsWorker` if `NEW_RELIC_LABELS` are not set

### Fixes
- ensure memory data are cloned properly

## [7.11.0] - 2023-07-03
### Changed
- pull validators list from target blockchain
- do not overshoot heartbeat
- cache required number of signatures

## [7.10.0] - 2023-06-15
### Added
- add PolygonDeviationDispatcher

### Changed
- on-chain leader decentralisation
- do not save intervals if you not a leader (each leader will check feed at least once)
- do not run minter/leader if we can not dispatch
- slow down fetching uniswap prices when no prices

## [7.9.0] - 2023-06-01
### Added
- On-Chain deviation feeds

## [7.8.0] - 2023-04-18
### Added
- `OnChainDataFetcher`: add support for returning structs 

## [7.7.3] - 2023-03-21
### Fixed
- do not include values that are zeros

### Updated
- purge blocks older than 6 months

## [7.7.2] - 2023-03-09
### Changed
- update umbrella SDK
- update ethers to v5.7.2
- use mapping (instead of file) to monitor last tx

### Fixed
- force "@noble/hashes" `~v1.2.0` because `1.3.0` causes `Error: Cannot find module 'node:crypto'`
- set manually gasLimit for arbitrum

## [7.7.1] - 2023-03-01
### Changed
- use `StaticJsonRpcProvider` to reduce RPC calls
- adjust gas settings for arbitrum

### Fixed
- fix TS2339: Property 'timestamp' does not exist on type 'TransformableInfo'

## [7.7.0] - 2023-01-26
### Added
- cache masterchain data required to run consensus

### Changed
- set default timeout to 5s for `chain.getStatus()`

### Removed
- remove deprecated leader selection

## [7.6.6] - 2023-01-26
- Fixed GitHub Action "CI"

## [7.6.5] - 2023-01-05
### Fixed
- ignore keys longer than 32 bytes

## [7.6.4] - 2023-01-04
### Fixed
- fixed errors with `express-serve-static-core` package causing:
```
@types/express-serve-static-core/index.d.ts(1197,33): error TS1005: ';' expected.
@types/express/node_modules/@types/express-serve-static-core/index.d.ts(1265,1): error TS1160: Unterminated template literal.
```

## [7.6.3] - 2022-12-05
### Changed
- better logs messages

## [7.6.2] - 2022-12-02
### Fix
- Remove `type` for avax `calculatePayableOverrides`

## [7.6.1] - 2022-12-01
### Changed
- Use min padding as consensus round length

## [7.6.0] - 2022-11-10
### Added
- display registry and rpc over multichain settings in `/info` endpoint
- display uniswap contract addresses in `/info` endpoint

## [7.5.0] - 2022-11-10
### Changed
- Start chain dispatcher based on settings

### Added
- Dispatch avalanche blocks 

## [7.4.7] - 2022-10-26
### Fixed
- Use connections options to connect on Redis

## [7.4.6] - 2022-10-20
### Changed
- Updated docker compose to include block dispatcher

## [7.4.5] - 2022-10-19
### Changed
- Upgrade BullMQ to ~2.3.2

## [7.4.4] - 2022-10-14
### Fixed
- Ensure dispatcher does not submit same consensus twice
- Ensure leader selection is backward compatible

## [7.4.3] - 2022-10-04
### Fixed
- Use old isLeader selection when chain architecture is not for dispatcher worker.

## [7.4.2] - 2022-10-04
### Changed
- Skip CoingeckoPriceMultiFetcher tests.

## [7.4.1] - 2022-10-04
### Added
- Added new pub key on action: `CI`.

## [7.4.0] - 2022-09-26
### Added
- Created service to fetch state from a list of chainIds
- `LeaderSelector` service
- Created ConsensusData model

### Changed
- Created api price freshness settings
- Use LeaderSelector to get leader when sign and mint a block
- Run workers in concurrency mode

## [7.3.1] - 2022-05-23
### Changed
- Uniswap agent only gets successful prices

## [7.3.0] - 2022-05-12
### Added
- Publish different pegasus versions to dockerhub using tags

### Changed
- Bump ethers to 5.5.1
- Bump @umb-network/toolbox to 5.10.0
- Changed BlockMinter to use Gas Estimator from SDK

### Removed
- Deleted GasEstimator

## [7.2.0] - 2022-04-28
### Added
- Coingecko multi price fetcher
- Multi-feeds processors sub-services for FeedProcessor

### Removed
- Coingecko single price fetcher

### Changed
- Enabled FeedProcessor integration test

## [7.1.1] - 2022-04-27
### Fixed
- Updated package.json version

## [7.1.0] - 2022-04-20
### Added
- Optional MongoDB Price Storage & Aggregation engine

### Changed
- Update `name` env to use `NEW_RELIC_APP_NAME`
- Updated the way logs are shown in Uniswap price Scanner
- Enabled BlockSigner unit test
- Enabled FeedProcessor unit test
- Optimized loadFeeds function to use etag and caching

## [7.0.0] - 2022-03-11
### Added
- Better signature collection & discrepancy handling

## [6.5.1] - 2022-03-09
### Fixed
- Update Git workflows when merging to main

## [6.5.0] - 2022-03-08
### Added
- Added `RPC_SELECTION_STRATEGY` in env

### Changed
- Updated options prices feeds to include new fields
- Upgrade SDK to 5.7.0
- Changed Blockchain class to use RPC selection from SDK
- Check if balance is enough before execute transaction
- Re-enable RPC Selection before minting/signing

### Removed
- Removed RPCSelector class

## [6.4.0] - 2022-02-21
### Added
- Divide the Polygon snapshot list into batches

### Changed
- optimize `/info` endpoint calls

## [6.3.0] - 2022-02-07
### Added
- Check if gas is enough before execute transaction
- unique codes for timeouts

## [6.2.3] - 2022-02-07
### Fixed
- make sure we do not call ourselves for signature
- fix sorting signatures (no case sensitivity)

## [6.2.2] - 2022-02-04
### Changed
- Minimum timeout for StatusCheck 5000 -> 10000 ms

## [6.2.1] - 2022-02-04
### Fixed
- Ensures that the UniswapPoolScanner agent can start without OTA enabled
- Uniswap Verified Pool optimized query index

## [6.2.0] - 2022-01-28
### Added
- Uniswap OTA updates
- Uniswap MongoDB price management 
- Swagger documentation on /docs.
- Added RPC Selection before minting

## [6.1.1] - 2022-01-27
### Added
- Reapply Uniswap

## [6.1.0] - 2022-01-13
### Added
- fetching prices from UniswapV3

## [6.0.4] - 2021-01-24
### Added
- dump validators response in debug mode 

## [6.0.3] - 2021-01-21
### Added
- /debug/feeds endpoint

## [6.0.2] - 2022-01-21
### Removed
- uniswapV3 integration

## [6.0.1] - 2021-12-09
### Changed
- Increased JSON payload size

## [6.0.0] - 2021-12-08
### Added
- Added RandomNumberFetcher

## [5.6.1] - 2021-12-08
### Removed
- Reverted RandomNumberFetcher

## [5.6.0] - 2021-12-07
### Added
- Added RandomNumberFetcher

## [5.5.4] - 2021-11-17
### Added
- CORS Support.

### Fixed
- Consensus Round countdown indexed to 1.

## [5.5.3] - 2021-11-16

### Fixed
- Settings file URL mapper for production environment

## [5.5.2] - 2021-11-12
### Added
- Additional consensus logging.

### Fixed
- Consensus retry logic.

### Changed
- Increased consensus discrepancy threshold.

## [5.5.1] - 2021-10-28
### Added
- Ability to handle Internal validators separatly.
- Decouple the docker hub image update from the automatic deployment
- Consensus Optimization feature flag.
- Multiple feeds file handler

## [5.5.0] - 2021-10-25
### Fixed
- Price Aggregator auto-pruning on insert to prevent current regular OOM issues.

### Added
- Added Yearn vaults support
- Add Consensus Optimization to reduce the number of discrepant dropped keys;

### Changed
- Change default feeds URLs to BSC feeds files
- Refactored Options to use Calculator

## [5.4.0] - 2021-10-13
### Added
- Add a `retryStrategy` to the Redis connection, to attempt a re-connection up to a 10-second interval;
- Add a `maxRetryTime` for Redis re-connection interval. Default 10 seconds (10000 ms);
- Add options price API key in the /info endpoint;

## [5.3.2] - 2021-09-29
### Changed
- Refactored FeedProcessor leaf building to Service Object
- Add "OP:" to options leaves names

## [5.3.1] - 2021-09-29
### Added
-  Support new multichain feature on Makefile and github actions

### Fixed
- fixed a case where the OptionsPrice Fetcher interrupts minting process when fails a request

## [5.3.0] - 2021-09-28
### Added
- Added a new fetcher for the OptionPrices
- Added a default value for discrepancy in consensus

## [5.2.0] - 2021-09-23
### Added
- add `KaikoPriceStream` stream fetcher

## [5.1.1] - 2021-09-03
### Fixed
- now it just logs and does not break feed processing if does not find fetcher

## [5.1.0] - 2021-08-31
### Changed
- Ignore validators with high discrepancies

## [5.0.9] - 2021-08-30
### Changed
- turn off power check

### Fixed
- exclude validator from consensus if check for its status fails

## [5.0.8] - 2021-08-25
### Changed
- change gas calculation

## [5.0.7] - 2021-08-25
### Changed
- unify way for executing "normal" and canceling transactions
- update `ethers`

## [5.0.6] - 2021-08-24
### Added
- add additional logs for `BlockMintingWorker`

## [5.0.5] - 2021-08-24
### Added
- add handling for `nonce has already been used` error

## [5.0.4] - 2021-08-19
### Added
- add additional logs for tracking number of leaves and FCDs

## [5.0.3] - 2021-08-13
### Changed
- change enqueueing rules

## [5.0.2] - 2021-08-12
### Changed
- update ethers to version that supports EIP-1559 London

## [5.0.1] - 2021-08-11
### Changed
- use SDK v4.0.1
- as temporary fix change `jobId`

## [5.0.0] - 2021-08-07
### Added
- add InfluxDB to docker-compose core

### Changed
- support for `Chain` with 2 signatures requirement
- update toolbox

## [4.2.17] - 2021-08-06
### Fixed
- adds JobId to ensure jobs are unique (limits task queue growing indefinitely)

## [4.2.16] - 2021-08-05
### Removed
- removed `ValidatorRegistry` settings

## [4.2.15] - 2021-07-30
### Changed
- better gas estimation

## [4.2.14] - 2021-07-29
### Added
- detailed logs about gas

## [4.2.13] - 2021-07-29
### Added
- add gas price to logs

## [4.2.12] - 2021-07-29
### Changed
- clear logs after debugging

## [4.2.11] - 2021-07-29
### Added
- more logs for minting tx process for debugging purpose

## [4.2.10] - 2021-07-28
### Added
- more logs for minting tx process

## [4.2.9] - 2021-07-26
### Added
- DB Migration service
- add version to API block endpoint

### Changed
- store all signed blocks and let explorer choose valid one
- return list of all blocks for `blockId` call
- wait for new block to be minted before set timeout for submitted tx

### Removed
- remove `RevertedBlockResolver`

## [4.2.8] - 2021-07-15
### Fixed
- fix `obfuscate` function

## [4.2.7] - 2021-07-14
### Added
- add more details to `/info` endpoint
- add protection to not override minted blocks

## [4.2.6] - 2021-07-13
### Added
- Add SANDBOX workflow

## [4.2.5] - 2021-07-12
### Fixed
- wait for canceling tx to be minted

## [4.2.4] - 2021-07-09
### Fixed
- fix linters errors

## [4.2.3] - 2021-07-09
### Fixed
- fix default paths to feeds files

## [4.2.2] - 2021-07-07
### Added
- better error handling for `predict the future` error 

## [4.2.1] - 2021-07-07
### Changed
- Updated /debug endpoint

## [4.2.0] - 2021-07-06
### Added
- Polygon.io for crypto

## [4.1.2] - 2021-07-06
### Changed
- change error message for `SignatureCollector` to reflect issue better 

## [4.1.1] - 2021-07-05
### Added
- make log level configurable

### Fixed
- fix gas calculation

## [4.1.0] - 2021-07-02
### Added
- new fetcher CoinmarketcapHistoDay
- new fetcher CoinmarketcapHistoHour

## [4.0.0] - 2021-06-29
### Added
- `OnChain` feed collector

### Changed
- restrict packages versions with `~`

## [3.3.1] - 2021-06-28
### Fixed
- Remove last block if it was not minted

## [3.3.0] - 2021-06-26
### Added
- save blocks at Block Sign request

### Changed
- refactored block saving mechanism for code reuse
- typo fix. revered -> reverted
- split BlockSigner into services for better QA

### Fixed
- potentially fix issue with discrepancies by refactoring code

### Removed
- leaf collection is no longer used
- DB migrations

## [3.2.3] - 2021-06-23
### Fixed
- Ignore out-of-date crypto prices in CryptoCompareWSClient

## [3.2.2] - 2021-06-18
### Fixed
- Fixed VWAP calculation
- Fixed aggregate price calculation

## [3.2.1] - 2021-06-18
### Added
- CryptoCompare re-connect timeout

## [3.2.0] - 2021-06-18

### Changed
- remove loadFeeds to use toolbox's loadFeeds
- calculate gas price dynamically
- TX cancellation for pending TXs
- worker's jobs are now deleted from redis when completed
- Minted blocks are reported to NewRelic

### Removed
- remove unnecessary consensus data, that block explorer is getting directly from blockchain

## [3.1.1] - 2021-06-09
### Added
- Moves constants to its own directory

## [3.1.0] - 2021-06-03

### Added
- added reporting of reverted blocks to NewRelic
- added reporting of data source errors to NewRelic
- added reporting of transaction errors to NewRelic
- support CryptoCompare Multiple Symbols Price API

## [3.0.2] - 2021-06-01
### Fixed
- cicd workflow run to set production tag

## [3.0.1] - 2021-06-01
### Added
- add new worker to report metrics to NewRelic
- Improve tests execution and cleanup
- Ensure Prod build is not executed if tests failed
- Add develop workflow for the E2E testing (SDK and Reff App)
- Add Badges for actions and Argocd

## [3.0.0] - 2021-05-24
### Added
- collect consensus data from events

### Changed
- support storing only latest FCDs
- support full `Chain` storage optimisation
  
### Removed
- delete deprecated blocks on boot
- remove `MerkleTree` class (use one from SDK)

## [2.0.4] - 2021-05-20
### Changed
- Average CPI implemented

## [2.0.3] - 2021-05-10
### Changed
- Fixed BlockSigner and the case when validator fails to calculate values

## [2.0.2] - 2021-05-10
### Changed
- Support hundreds of US equities

## [2.0.1] - 2021-04-23
### Added
- logging for consensus retries and version check

## [2.0.0] - 2021-04-22
### Added
- added new event `PriceDiscrepancy` reported to NewRelic
- self-adjusting consensus, that can ignore discrepancy pairs

## [1.0.1] - 2021-04-16

## Changed
- set `dataTimestamp` with an offset

## [1.0.0] - 2021-04-15

## Changed
- use `dataTimestamp` as part of consensus
- use `chain.getStatus` to pull all consensus data

## Removed
- `ValidatorRegistry`

## [0.10.6] - 2021-04-15

### Fix
- cryptocompare logging

## [0.10.5] - 2021-04-15

### Added
- Resubscribe stale subscriptions

## [0.10.4] - 2021-04-13

### Added
- Check cryptocompare heartbeat

## [0.10.2] - 2021-04-13

### Fix
- Save all values and timestamps on redis

## [0.10.1] - 2021-04-13

### Fix
- Debug endpoint

## [0.10.0] - 2021-04-13

### Added
- code prettier

### Fix
- Keep at least one value provided by cryptocompare

## [0.9.3] - 2021-04-09

### Fix
- Fixed SIGNATURE_TIMEOUT

## [0.9.2] - 2021-04-08

### Change
- SIGNATURE_TIMEOUT is defaulted to 15 seconds

## [0.9.1] - 2021-04-08

### Change
- optimized getValidators
- configure CryptoCompare price expiry
- added extra logs

## [0.9.0] - 2021-04-07

### Added
- Added StatsD Client

### Change
- submit prices based on a timestamp

## [0.8.2] - 2021-04-02

### Change
- better error handling in /info

## [0.8.1] - 2021-04-02

### Added
- timout for /signature endpoint

## [0.8.0] - 2021-04-02

### Added
- More logging to BlockSigner
- Disconnect CryptoCompare WS every 4 hours

### Changed
- feed files can be loaded from a remote host
- check for the leader based on the next block
- NewRelic is disabled by default

## [0.7.2] - 2021-03-25

### Fix
- feedsOnChain.yaml

## [0.7.1] - 2021-03-25

### Added
- CryptoCompare data source for UMB

## [0.7.0] - 2021-03-25

### Added
- Extra logging with coloring
- Multiple optimizations to speed up consensus

## [0.6.2] - 2021-03-24

### Fixed
- The leader includes his signature first

## [0.6.1] - 2021-03-23

### Fixed
- No EX for CryptoCompare WS
- Fixed MongoDB queries to be compatible with 4.0.0

## [0.6.0] - 2021-03-23

### Fixed
- deal with discrepancies

### Removed
- /blocks endpoint

### Fixed
- renamed HOLO to HOT

## [0.5.0] - 2021-03-13
### Added
- documented all env variables
- multi-node set-up

### Fixed
- do not cache `ValidatorRegistry`

## [0.4.0] - 2021-03-12

### Added

- Repository Migration

## [0.3.3] - 2021-03-12

### Fixed

- Support case when blocks can be reverted

## [0.3.2] - 2021-03-09

### Fixed

- precision in FeedProcessor

## [0.3.1] - 2021-03-09

### Fixed

- do not cache `Chain` address, pull it from registry
- environment info

### Changed

- update toolbox version

## [0.3.0] - 2021-03-09

### Fixed

- FeedProcessor assigned the same label to all values

## [0.2.3] - 2021-03-08

### Added

- add validator to `/info` endpoint

## [0.2.2] - 2021-03-08

### Fixed

- fix `/info` endpoint

## [0.2.1] - 2021-03-03

### Changed

- updated package.json version

## [0.2.0] - 2021-03-03

### Added

### Changed

- fixed an bug in ChainContract::submit when Signer was not provided
- bumped toolbox version

## [0.1.0] - 2021-02-24

### Added

- initial version
- use registry to resolve Chain address
- support numeric first class data
- cryptocompare API support
- Genesis Volatility support
- support multiple data sources
- validate feeds.json through schema

### Changed

- use `@umb-network/toolbox` for fetching ABIs for contracts
