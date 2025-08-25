import React, {useEffect, useState } from "react";
import { fetchData } from "../api.js";
import s from "./dill.module.css";
import clsx from "clsx";

const wallet = [
  {name:'00', wallet: '0xD73d38C9850A0006D5BD28A01Da915feA7673c25'},
  {name:'01', wallet: '0x67815283ce257c7da36d1498bad4059896f922c1'},
  {name:'04', wallet: '0xfd3aed9afa6e07367bf18bf9d6543d110fb9c849'},
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
    pool: item.pool.filter(i => i.OperatorAddress === item.wallet)
  };
});

console.log("sorted:", sorted);

if (!total) {
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

  return (
   <table className={s.table}>
  <thead>
    <tr>
      <th>N</th>
      <th>PoolAddress</th>
      <th>Status</th>
      <th>StakedAmount</th>
      <th>TotalRewards</th>
      <th>OperatorAddress</th>
      <th>CreateTime</th>
      <th>ExpTime</th>
    </tr>
  </thead>

  <tbody>
    {sorted.map(({ name, pool }) => (
      <React.Fragment key={name}>
        <tr>
          <td colSpan={8} style={{ fontWeight: "bold", background: "#f5f5f5" }}>
            {name} Account
          </td>
        </tr>

        {pool.map((p, index) => (
          <tr key={`${name}-${index}`}>
            <td>{index + 1}</td>
            <td>{p.PoolAddress}</td>
            <td className={status(p.Status)}>{p.Status}</td>
            <td>{`${p.StakedAmount / 1e9} / 36000`}</td>
            <td>{(p.TotalReward / 1e9).toFixed(2)}</td>
            <td>{p.OperatorAddress}</td>
            <td>{new Date(p.CreationTime * 1000).toLocaleString()}</td>
            <td>{new Date(p.ExpirationTime * 1000).toLocaleString()}</td>
          </tr>
        ))}
      </React.Fragment>
    ))}
  </tbody>
</table>
  );
};


export default Dill;
