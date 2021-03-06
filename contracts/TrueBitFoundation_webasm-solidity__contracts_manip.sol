pragma solidity ^0.4.15;

/**
* @title a handful of functions to handle loading and saving from memory
* @author Sami Mäkelä
*/
contract Test {
    // I guess EVM and webasm have different endian?
    /*
    function test() returns (bytes) {
        bytes memory work = new bytes(32);
        bytes memory b = new bytes(16);
        uint w = 0xff;
        assembly {
            mstore8(add(work,32), w)
        }
        return work;
    }*/
    // a and b are integer values that represent 8 bytes each
    function toMemory(uint a, uint b) returns (uint8[]) {
        uint8[] memory arr = new uint8[](16);
        storeN(arr, 0, 8, a);
        storeN(arr, 8, 8, b);
        return arr;
    }
    function storeN(uint8[] mem, uint addr, uint n, uint v) {
        for (uint i = 0; i < n; i++) {
            mem[addr+i] = uint8(v);
            v = v/256;
        }
    }
    function loadN(uint8[] mem, uint addr, uint n) returns (uint) {
        uint res = 0;
        uint exp = 1;
        for (uint i = 0; i < n; i++) {
            res += mem[addr+i]*exp;
            exp = exp*256;
        }
        return res;
    }
    function fromMemory(uint8[] mem) returns (uint a, uint b) {
        a = loadN(mem, 0, 8);
        b = loadN(mem, 8, 8);
    }
    
    function typeSize(uint ty) internal returns (uint) {
        if (ty == 0) return 4; // I32
        else if (ty == 1) return 8; // I64
        else if (ty == 2) return 4; // F32
        else if (ty == 3) return 8; // F64
    }
    
    function store(uint8[] mem, uint addr, uint v, uint ty, uint packing) {
        if (packing == 0) storeN(mem, addr, typeSize(ty), v);
        else {
            // Only integers can be packed, also cannot pack I32 to 32-bit?
            require(ty < 2 && !(ty == 0 && packing == 4));
            storeN(mem, addr, packing, v);
        }
    }
    
    function storeX(uint8[] mem, uint addr, uint v, uint hint) {
        store(mem, addr, v, (hint/2**3)&0x3, hint&0x7);
    }
    
    function load(uint8[] mem, uint addr, uint ty, uint packing, bool sign_extend) returns (uint) {
        if (packing == 0) return loadN(mem, addr, typeSize(ty));
        else {
            require(ty < 2 && !(ty == 0 && packing == 4));
            uint res = loadN(mem, addr, packing);
            if (sign_extend) {
                res = res | uint(-1)*2**packing*(res/2**(packing-1));
            }
            if (ty == 0) res = res % (2**32);
            return res;
        }
    }
    
    function loadX(uint8[] mem, uint addr, uint hint) returns (uint) {
        return load(mem, addr, (hint/2**4)&0x3, (hint/2)&0x7, hint&0x1 == 1);
    }
    
    function test(uint a, uint b) returns (uint, uint) {
        return fromMemory(toMemory(a,b));
    }
}


