"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";

const Contact = () => {
  const [contacts, setContacts] = useState();
  axios
    .post(`${process.env.NEXT_PUBLIC_BASE_API}contact/getAllContacts`)
    .then((response) => {
      setContacts(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>Tên đối tác</TableColumn>
        <TableColumn>Hình ảnh</TableColumn>
        <TableColumn>Liên kết trang web</TableColumn>
        <TableColumn>Trạng thái</TableColumn>
        <TableColumn> </TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>Tony Reichert</TableCell>
          <TableCell>CEO</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow key="2">
          <TableCell>Zoey Lang</TableCell>
          <TableCell>Technical Lead</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>Paused</TableCell>
        </TableRow>
        <TableRow key="3">
          <TableCell>Jane Fisher</TableCell>
          <TableCell>Senior Developer</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell>William Howard</TableCell>
          <TableCell>Community Manager</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>Vacation</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default Contact;
