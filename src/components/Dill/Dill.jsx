import  {useEffect, useState } from "react";
import { fetchData } from "../api.js";
import s from "./dill.module.css";
import clsx from "clsx";

const wallet = [
  {name:'00', wallet: '0xD73d38C9850A0006D5BD28A01Da915feA7673c25'},
  {name:'01', wallet: '0x67815283CE257c7dA36d1498Bad4059896F922c1'},
  {name:'04', wallet: '0xfd3aed9AFa6e07367Bf18bf9d6543d110Fb9c849'},
  {name:'15', wallet: '0x4D39586CF57fdd7E06859a7a19Aae88416De5aC7'},
  {name:'17', wallet: '0xB41cAD9FD4955C2c145c6Dc79932544315779743'},
  {name:'25', wallet: '0x46aa0d369ef0f1fC94ce579C1CE11F7D9620d0e9'},
  {name:'27', wallet: '0xfDc2442dB45C71fd18176941Bc7eBA61d5cac448'},
]

const Dill = () => {
  const [total, setTotal] = useState([]);

useEffect(() => {
  const fetchDataAsync = async () => {
    const results = await Promise.all(
      wallet.map(async (item) => {
        const { data } = await fetchData(item.wallet);
        return {
          name: item.name,
          wallet: item.wallet,
          pool: data?.Pools ?? []
        };
      })
    );
    setTotal(results);
  };

  fetchDataAsync();
}, []);

const sorted = total.map(item => {
  return {
    ...item,
    pool: item.pool
    .filter(i => i.OperatorAddress === item.wallet)
    .sort((a, b) => b.CreationTime - a.CreationTime)
  };
});

if (sorted.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "36px",
        }}
      >
        <div>Loading...</div>
      </div>
    );
  }

  const status = (status) => {
    return clsx(
      status === "ActiveFull" ? s.activeFull : null,
      status === "ActiveOpen" ? s.activeOpen : null,
      status === "UnStaking" ? s.unStaking : null,
      status === "AwaitingLiquidation" ? s.awaitingLiquidation : null,
      status === "Creating" ? s.creating : null
    );
  };

const getClassName = (time) => {
  const days = daysToExpire(time);
  if (days > 10) return clsx(s.days, s.green);
  if (days > 3) return clsx(s.days, s.orange);
  return clsx(s.days, s.red);
};

const toLocalTime = (time) => {
  return new Date(time * 1000).toLocaleString("ru-RU", {
    timeZone: "UTC",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
};

const daysToExpire = (timeInSeconds)=> {
 const time = timeInSeconds * 1000;
  const remaining = time - Date.now();
  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  return days;
};


const statPool = sorted.reduce((acc, { pool }) => {
  
  const stat = pool.reduce((pAcc, i) => {  
    pAcc.staked += i.StakedAmount / 1e9;
    pAcc.totalRewards += i.TotalReward / 1e9;
    pAcc.number += 1;
    return pAcc;
  }, { staked: 0, number: 0, totalRewards: 0 });

  acc.staked += stat.staked;
  acc.number += stat.number;
  acc.totalRewards += stat.totalRewards;
  return acc;
}, { staked: 0, number: 0, totalRewards: 0 });

  return (
<table className={s.table}>
  <thead>
    <tr className={s.header}>
      <th>N</th>
      <th>PoolAddress</th>
      <th>Status</th>
      <th>StakedAmount</th>
      <th>TotalRewards</th>
      <th>Earnings (24h)</th>
      <th>OperatorAddress</th>
      <th>Days to expire</th>
      <th>CreateTime</th>
      <th>ExpTime</th>
    </tr>
  </thead>

  {sorted.map(({ name, pool }) => (
    <tbody key={name}>
      <tr>
        <td
          colSpan={10}
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            background: "#ffffffff",
            position: "sticky",
            top: 0,
            height: 30,
          }}
        >
          {name} Account
        </td>
      </tr>

      {pool.map((p, index) => (
        <tr key={`${name}-${index}`}>
          <td>{index + 1}</td>
          <td>{p.PoolAddress}</td>
          <td className={status(p.Status)}>{p.Status}</td>
          <td>{`${p.StakedAmount / 1e9} / 36000`}</td>
          <td className={s.rewards}>{(p.TotalReward / 1e9).toFixed(2)}</td>
          <td className={s.earning}>{(p.Earning / 1e9).toFixed(2)}</td>
          <td>{p.OperatorAddress}</td>
          <td className={getClassName(p.ExpirationTime)}>{daysToExpire(p.ExpirationTime)}</td>
          <td>{toLocalTime(p.CreationTime)}</td>
          <td>{toLocalTime(p.ExpirationTime)}</td>
        </tr>
      ))}
    </tbody>
  ))}
  <tr>
        <td
          colSpan={9}
          style={{
            fontWeight: "bold",
            fontSize: '20px',
            color: 'red',
            background: "#ffffffff",
            position: "sticky",
            top: 0,
            height: 30,
          }}
        >
          {`Total: ${statPool.number}, Staked: ${statPool.staked}, toStake: ${(statPool.number * 36000) - statPool.staked} totalRewards: ${statPool.totalRewards.toFixed(2)}`} 
        </td>
      </tr>
</table>

)};


export default Dill;
