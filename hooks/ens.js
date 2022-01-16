import {useEffect, useState} from "react";
import {ethers} from "ethers";
import {getAddressFromEns, getEnsNameFromAddress} from "../utils/api";
import {convertChecksum} from "../utils/helpers";
import ENS, { getEnsAddress } from '@ensdomains/ensjs'

export function useEnsAddress(address) {
    const [name, setName] = useState(null);

    const getNameFromAddress = async () => {

        const name =  await getEnsNameFromAddress(address)
        setName(name.name)
    };

    useEffect(() => {




        getNameFromAddress();
    }, []);

    return name;
}


export function useEnsName(name) {
    const [address, setAddress] = useState(null);

    const getAddressFromName = async () => {

        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        // const _address = await provider.resolveName(name);
        //
        //
        // setAddress(_address)


    };

    useEffect(() => {

        getAddressFromName();
    }, []);

    return address;
}

