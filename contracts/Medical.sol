pragma solidity >=0.4.21 <0.6.0;
 
/**
 * owned是合约的管理者
 */
contract owned {
    address public owner;
 
    /**
     * 初台化构造函数
     */
    constructor() public {
        owner = msg.sender;
    }
 
    /**
     * 判断当前合约调用者是否是合约的所有者
     */
    modifier onlyOwner {
        require( msg.sender == owner,
        "sender is not authorized");
        _;
    }
 
    /**
     * 合约的所有者指派一个新的管理员
     * @param  newOwner address 新的管理员帐户地址
     */
    function transferOwnership(address newOwner) public onlyOwner{
        if (newOwner != address(0)) {
            owner = newOwner;
        }
    }
}

contract Medical is owned{

    //属性
    struct Medicalinfo {
        string name;//病人姓名
        string time;    //就诊时间
        string info;  //就诊信息
        uint8  status_A;  //A医院状态 1是未授权，2是授权
        uint8  status_B;  //B医院状态 1是未授权，2是授权
        uint8  status_C;  //C医院状态 1是未授权，2是授权
    }

    //记录所有数据映射
    mapping (uint => Medicalinfo) medicalinfo;

    constructor() public{}


    //保存
    function saveinfo(string memory name ,string memory time,string memory info) public{        
        medicalinfo[0].name = name;
        medicalinfo[0].time=time;
        medicalinfo[0].info=info;
        medicalinfo[0].status_A=2;
        medicalinfo[0].status_B=1;
        medicalinfo[0].status_C=1;
    }

    //清空数据
    function deleteinfo() public{
        medicalinfo[0].name = "";
        medicalinfo[0].time="";
        medicalinfo[0].info="";
        medicalinfo[0].status_A=1;
        medicalinfo[0].status_B=1;
        medicalinfo[0].status_C=1;
    }
 
    //查询数据
    function selectAll() public view returns (string memory name ,string memory time,string memory info,uint8 status_A,uint8 status_B,uint8 status_C){
        name=medicalinfo[0].name;
        time=medicalinfo[0].time;
        info=medicalinfo[0].info;
        status_A=medicalinfo[0].status_A;
        status_B=medicalinfo[0].status_B;  
        status_C=medicalinfo[0].status_C;
        return (name,time,info,status_A,status_B,status_C);
    }

    //审核
    function update_A(uint8 i) public{
        medicalinfo[0].status_A=i;
    }
    //审核
    function update_B(uint8 i) public{
        medicalinfo[0].status_B=i;
    }
    //审核
    function update_C(uint8 i) public{
        medicalinfo[0].status_C=i;
    }

}

