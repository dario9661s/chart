import React from 'react';
import './App.css';
import  { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, AreaChart, Tooltip, Area, CartesianGrid, ResponsiveContainer } from "recharts";
import axios from "axios"

export interface ILuna {
  active: boolean;
  antiWhale?: null;
  aprDaily: number;
  aprWeekly: number;
  aprYearly: number;
  apyYearly: number;
  asset: string;
  assetAddress?: null;
  assetId: string;
  assetLockup: boolean;
  assetPopupMessage?: null;
  assetPrice: number;
  auditInfo: string;
  blockchain: string;
  category?: null;
  collateralLockPeriod?: null;
  d_active_reason?: null;
  dateAdded: string;
  dateEnding?: null;
  dateStarted?: null;
  dateUpdated: string;
  daysRemaining?: null;
  depositFee?: null;
  exchangeName?: null;
  exchangePicture?: null;
  exchangeUrl?: null;
  exchangeVersion?: null;
  farm: string;
  farmId: string;
  farmImage?: null;
  farmName: string;
  farmType?: null;
  feeAprYearly: number;
  harvestLockup?: null;
  harvestLockupInfo?: null;
  impermanentLoss?: null;
  impermanentLoss30d?: null;
  info?: null;
  investmentLink?: null;
  manuallyCalculatedAPR: boolean;
  maxPoolCap?: null;
  multiplier?: null;
  nativeToken?: null;
  nativeTokenAddress?: null;
  nativeTokenInvestLink?: null;
  nativeTokenMarketCap: number;
  nativeTokenPrice: number;
  new_asset: boolean;
  otherFees?: null;
  otherPoolEconomicsInfo?: null;
  pid: number;
  poolAlreadyFilled: boolean;
  priceCorrelation_30d?: null;
  rewardTokenA?: null;
  rewardTokenAAddress?: null;
  rewardTokenAAprYearly: number;
  rewardTokenAAprYearlyMaxBoosted: number;
  rewardTokenAPrice: number;
  rewardTokenAWeeklyAmount: number;
  rewardTokenAWeeklyDollarAmount: number;
  rewardTokenB?: null;
  rewardTokenBAddress?: null;
  rewardTokenBAprYearly: number;
  rewardTokenBAprYearlyMaxBoosted: number;
  rewardTokenBPrice: number;
  rewardTokenBWeeklyAmount: number;
  rewardTokenBWeeklyDollarAmount: number;
  scam: boolean;
  scamInfo?: null;
  selected_farm?: (SelectedFarmEntity)[] | null;
  stakingAddress?: null;
  stakingLink: string;
  status: string;
  tokenA?: null;
  tokenAAddress?: null;
  tokenABacking: number;
  tokenAHolders: number;
  tokenAHoldersHistory?: (TvlStakedHistoryEntityOrTokenAHoldersHistoryEntityOrTokenAPriceHistoryEntity)[] | null;
  tokenAPicture?: null;
  tokenAPrice: number;
  tokenAPriceHistory?: (TvlStakedHistoryEntityOrTokenAHoldersHistoryEntityOrTokenAPriceHistoryEntity)[] | null;
  tokenB?: null;
  tokenBAddress?: null;
  tokenBBacking: number;
  tokenBHolders: number;
  tokenBPicture?: null;
  tokenBPrice: number;
  tokenC?: null;
  tokenCAddress?: null;
  tokenCBacking: number;
  tokenCHolders: number;
  tokenCPicture?: null;
  tokenCPrice: number;
  tokenD?: null;
  tokenDAddress?: null;
  tokenDBacking: number;
  tokenDHolders: number;
  tokenDPicture?: null;
  tokenDPrice: number;
  tokenE?: null;
  tokenEAddress?: null;
  tokenEBacking: number;
  tokenEHolders: number;
  tokenEPicture?: null;
  tokenEPrice: number;
  transferTax?: null;
  transferTaxInfo?: null;
  tvlChange24h: string;
  tvlChange24hValue: number;
  tvlExchange: number;
  tvlFarm: number;
  tvlStaked: number;
  underlyingFarm?: null;
  url?: null;
  vaultAddress?: null;
  volume_24h?: null;
  weight?: null;
  withdrawalFee?: null;
  yearlyTokenRewardPool: number;
  yieldType: string;
}
export interface SelectedFarmEntity {
  _locks?: (string)[] | null;
  active: boolean;
  blockchain: string;
  dateAdded: string;
  dateUpdated: string;
  farmId: string;
  farmName: string;
  farmType: string;
  lastFullUpdate: string;
  scam: boolean;
  scamInfo: string;
  tvlChange24h: string;
  tvlChange24hValue: number;
  tvlStaked: number;
  tvlStakedHistory?: TvlStakedHistoryEntityOrTokenAHoldersHistoryEntityOrTokenAPriceHistoryEntity[] | null;
}
export interface TvlStakedHistoryEntityOrTokenAHoldersHistoryEntityOrTokenAPriceHistoryEntity {
  date: string;
  value: number;
}


function App() {
  const [apr, setApr] = useState<TvlStakedHistoryEntityOrTokenAHoldersHistoryEntityOrTokenAPriceHistoryEntity[]>();
  const [tvl, setTvl] = useState<TvlStakedHistoryEntityOrTokenAHoldersHistoryEntityOrTokenAPriceHistoryEntity[]>();
  const [aprRising, setAprRising] = useState<TvlStakedHistoryEntityOrTokenAHoldersHistoryEntityOrTokenAPriceHistoryEntity[]>();

  useEffect(() => {
    let aprArray:TvlStakedHistoryEntityOrTokenAHoldersHistoryEntityOrTokenAPriceHistoryEntity[] = [];
    let aprRisingArray:string[] = [];
    let aprRisingArrayFake:TvlStakedHistoryEntityOrTokenAHoldersHistoryEntityOrTokenAPriceHistoryEntity[] = [];

    let tvlArray:TvlStakedHistoryEntityOrTokenAHoldersHistoryEntityOrTokenAPriceHistoryEntity[] = [];
    axios.get('https://api.multifarm.fi/jay_flamingo_random_6ix_vegas/get_assets?pg=1&tvl_min=50000&sort=tvlStaked&sort_order=desc&farms_tvl_staked_gte=10000000').then((res)=> {
      res.data.data.map((asset:ILuna) => {
        if(asset.assetId === "TERRA_Lido__LUNA"){
        asset && asset.selected_farm &&
        asset.selected_farm[0] &&
        asset.selected_farm[0].tvlStakedHistory &&
        asset.selected_farm[0].tvlStakedHistory.map((e:TvlStakedHistoryEntityOrTokenAHoldersHistoryEntityOrTokenAPriceHistoryEntity, i)=> {
          tvlArray.push(e)
          aprArray.push({
            value: 5,
            date: e.date
          })
          aprRisingArray.push(e.date)
        })
        }
      })
      aprRisingArray.sort(sortFunctionDate).map((date, i) => {
        aprRisingArrayFake.push({
          value: 5 * i,
          date: date
        })
      })
      setTvl(tvlArray.sort(sortFunction));
      setApr(aprArray.sort(sortFunction));
      setAprRising(aprRisingArrayFake);
    }
  )
  },[]);

  function sortFunction(a:TvlStakedHistoryEntityOrTokenAHoldersHistoryEntityOrTokenAPriceHistoryEntity,b:TvlStakedHistoryEntityOrTokenAHoldersHistoryEntityOrTokenAPriceHistoryEntity){
    var dateA = new Date(a.date).getTime();
    var dateB = new Date(b.date).getTime();
    return dateA > dateB ? 1 : -1;
  };
  function sortFunctionDate(a:string,b:string){
    var dateA = new Date(a).getTime();
    var dateB = new Date(b).getTime();
    return dateA > dateB ? 1 : -1;
  };
  return (
    <div className="App">
      <h1>Lido LUNA</h1>
      <h2>asset TVL</h2>
      <ResponsiveContainer width='100%'   aspect={5.0/2.0}>
        <AreaChart data={tvl}
                   margin={{ top: 10, right: 30, left: 60, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="date" />
          <YAxis dataKey="value" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
        </AreaChart>
      </ResponsiveContainer>
      <h2>asset APR (y) constant 5%</h2>
      <ResponsiveContainer width='100%'   aspect={5.0/2.0}>
        <AreaChart data={apr}
                   margin={{ top: 10, right: 30, left: 60, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="date" />
          <YAxis dataKey="value" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
        </AreaChart>
      </ResponsiveContainer>
      <h2>asset APR (y) ascending 5%</h2>
      <ResponsiveContainer width='100%'   aspect={5.0/2.0}>
        <AreaChart data={aprRising}
                   margin={{ top: 10, right: 30, left: 60, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="date" />
          <YAxis dataKey="value" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default App;