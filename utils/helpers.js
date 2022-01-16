import {ethers} from "ethers";

const convertChecksum = (_address) => {
    return  ethers.utils.getAddress(_address)

}

export  {convertChecksum}