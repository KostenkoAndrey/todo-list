import axios from "axios";
const BASE_URL = "https://contacts-app-xj5y.onrender.com";

export const fetchData = async (wallet) => {
  try {
    const response = await axios.get(`${BASE_URL}/dill/${wallet}`);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

const acc0 = [14407.62, 3685.45, 3699.22, 3699.28, 3699.31, 3699.31, 3699.18, 3699.31, 37010.95, 3708.69, 3713.26, 3754.68, 3754.63, 3791.89, 3791.66, 3791.63, 7271.25, 3671.39, 3739.71, 3745.76, 10878.48];
const acc1 = [3649.5046, 3791.9603, 3793.7434, 38619.8985, 3913.7723];
const acc2 = [3794.4690, 3804.5383, 3917.1109];
const acc3 = [3794.4027, 3801.0168, 3887.1260];
const acc4 = [3633.1083, 3794.3559, 38478.8283, 3914.9237];
const acc5 = [3758.4357, 3780.9130, 3917.2161];
const acc6 = [3794.3389, 3915.3736];
const acc7 = [3794.5093, 3913.9288];
const acc8 = [3790.8937, 3794.3255, 3840.3333, 3917.0467];
const acc9 = [3787.5137, 3794.3895, 3913.9319];
const acc10 = [3750.9794, 3905.2368];
const acc11 = [3710.2317, 3710.2007, 3635.3040, 3781.9216];
const acc12 = [3757.6786, 3888.3064];
const acc13 = [3887.9216];
const acc14 = [3758.6975, 3907.3285];
const acc15 = [3644.4183, 38837.1212, 3905.3031];
const acc16 = [3859.1935];
const acc17 = [3633.1356, 3749.9162, 38241.0704, 3936.0542];
const acc18 = [3758.6415, 3883.7764];
const acc19 = [3756.3202, 3790.3714, 3929.9863];
const acc20 = [3753.7306, 3899.9041];
const acc21 = [3888.4695];
const acc22 = [3782.9119, 3905.2668];
const acc23 = [3872.1471];
const acc24 = [3877.7228];
const acc25 = [3680.0634, 3782.8924, 3886.0307, 39326.5405, 46825.6323];
const acc26 = [3962.3929];
const acc27 = [3628.1092, 38611.4288, 3949.2819];
const acc47 = [3794.0843, 3836.5518];

const ALL = [...acc0, ...acc1, ...acc2, ...acc3, ...acc4, ...acc5, ...acc6, ...acc7, ...acc8, ...acc9, ...acc10, ...acc11, ...acc12, ...acc13, ...acc14, ...acc15, ...acc16, ...acc17, ...acc18, ...acc19, ...acc20, ...acc21, ...acc22, ...acc23, ...acc24, ...acc25, ...acc26, ...acc27, ...acc47];
const ALL1 = [acc0, acc1, acc2, acc3, acc4, acc5, acc6, acc7, acc8, acc9, acc10, acc11, acc12, acc13, acc14, acc15, acc16, acc17, acc18, acc19, acc20, acc21, acc22, acc23, acc24, acc25, acc26, acc27, acc47];

// const ALL1 = acc0;

const total = ALL1.reduce((acc, e)=>{
acc += e % 3600;
return acc;
},0);


const byAcc = ALL1.reduce((acc, e, i)=>{
    const stat = e.reduce((accumulate, e)=>{
      return accumulate += e % 3600;
    }, 0);

    acc.accounts.push({
    account: i,
    amount: stat.toFixed(2),
  });

  acc.total += stat;
  return acc;
},{ accounts: [], total: 0 });

