import { useEffect, useState } from "react";
import { fetchData, indexAddress } from "../api.js";
import s from "./dill.module.css";
import clsx from "clsx";

const Dill = () => {
  const [total, setTotal] = useState();

  useEffect(() => {
    const fetchDataAsync = async () => {
      const { data } = await fetchData();
      setTotal(data.Pools);
    };
    fetchDataAsync();
  }, []);
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

  const sortedPools = total.sort((a, b) => {
    const indexA = indexAddress.findIndex(
      (addr) => addr.toLowerCase() === a.PoolAddress.toLowerCase()
    );
    const indexB = indexAddress.findIndex(
      (addr) => addr.toLowerCase() === b.PoolAddress.toLowerCase()
    );
    return indexA - indexB;
  });

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
          <th>CreatTime</th>
          <th>ExpTime</th>
        </tr>
      </thead>
      <tbody>
        {sortedPools.map((pool, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{pool.PoolAddress}</td>
            <td className={status(pool.Status)}>{pool.Status}</td>
            <td>{`${pool.StakedAmount / 1e9} / 36000`}</td>
            <td>{(pool.TotalReward / 1e9).toFixed(2)}</td>
            <td>{pool.OperatorAddress}</td>
            <td>{new Date(pool.CreationTime * 1000).toLocaleString()}</td>
            <td>{new Date(pool.ExpirationTime * 1000).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Dill;
