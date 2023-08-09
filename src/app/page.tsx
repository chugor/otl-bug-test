"use client";

import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { Inter } from "next/font/google";
import styles from "./page.module.css";

type MyValue = {
  id: number;
  name: string;
  value: number;
  group: string;
};

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const limit = 10;
  const [data, setData] = useState<MyValue[]>([]);
  const [rows, setRows] = useState<MyValue[]>(data.slice(0, limit));

  const handleChange = (page: number) => {
    const start = limit * page;
    const end = start + limit;
    setRows(data.slice(start, end));
  };

  useEffect(() => {
    fetch("https://my-json-server.typicode.com/chugor/otl-db/db")
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setRows(data.slice(0, limit));
  }, [data]);

  return (
    <main className={styles.main}>
      <div>
        <div>
          {rows && (
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableBody>
                  {rows.map((row: MyValue) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="text"
            onClick={() => {
              handleChange(0);
            }}
          >
            First
          </Button>
          <Button
            variant="text"
            onClick={() => {
              handleChange(1);
            }}
          >
            Second
          </Button>
        </div>
      </div>
    </main>
  );
}
