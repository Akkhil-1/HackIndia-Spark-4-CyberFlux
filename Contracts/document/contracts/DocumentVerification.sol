// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DocumentVerification {
    struct Student {
        string id;
        string name;
        string details;
        address accountAddress;
    }

    mapping(string => Student) private students;

    function addStudent(string memory _id, string memory _name, string memory _details, address _accountAddress) public {
        students[_id] = Student(_id, _name, _details, _accountAddress);
    }

    function getStudent(string memory _id) public view returns (string memory, string memory, address) {
        Student memory student = students[_id];
        return (student.name, student.details, student.accountAddress);
    }
}
