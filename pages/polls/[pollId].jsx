import React, { useState, useEffect, useRef } from "react"

import CssBaseline from "@mui/material/CssBaseline"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import { createTheme, ThemeProvider } from "@mui/material/styles"

import ButtonAppBar from "../../components/buttonAppBar"
import FooterNav from "../../components/footerNav"
import axios from "axios"
import Description from "../../components/voting/description"
import MapOption from "../../components/voting/mapOption"
import CreateBtn from "../../components/voting/createBtn"

import { useRouter } from "next/router"
import ApiGateway from "../../apis/ApiGateway"
import UpdateBtn from "../../components/voting/updateBtn"

const theme = createTheme({
    palette: {
        primary: {
            main: "#808080",
        },
    },
    typography: {
        fontFamily: "'Jua', sans-serif",
        //fontFamily: "GmarketSansMedium",
    },
})

export default function Polls() {
    const router = useRouter()
    let response, readCountUp
    const { pollId } = router.query
    const [selected, setSelected] = useState([])
    const [polls, setPolls] = useState([])

    const getData = async () => {
        response = await ApiGateway.getPoll(pollId)
        setPolls(response.data)
    }

    const readCount = async () => {
        if (localStorage.getItem("accessToken") !== null) {
            response = await ApiGateway.readCount(pollId)
            console.log("됐나요~?!?#!@?#??~!@?!@#")
        }
    }

    useEffect(() => {
        if (pollId) {
            getData()
            readCount()
        }
    }, [pollId])

    const [voted, setVoted] = useState([])
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 9,
                        marginBottom: 7,
                        pl: 0.3,
                        pr: 0.3,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "left",
                        justifyContent: "center",
                        height: "83vh",
                        overflow: "hidden",
                    }}
                >
                    <Box className="header">
                        <ButtonAppBar titletext={"Polls"} />
                    </Box>
                    <Box
                        className="body"
                        flex="1"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Description data={polls} />
                        <Box className="amountNotice" sx={{ display: "flex", mt: -1, justifyContent: "center" }}>
                            {optionAmount(polls)}
                        </Box>
                        <Box display={"flex"} flexDirection={"column"} flex={"1"}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    flex: 1,
                                    //maxHeight: "42vh",
                                    overflow: "auto",
                                }}
                            >
                                <MapOption data={polls} voted={voted} setVoted={setVoted} />
                            </Box>
                            <CreateBtn pollId={pollId} isBallot={polls.isBallot} voted={voted} />
                        </Box>
                    </Box>

                    <Box className="footer">
                        <FooterNav />
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

const optionAmount = (polls) => {
    if (polls.responseType === "SINGLE") return "한 개의 문항을 선택해주세요."
    return "한 개 이상의 문항을 선택해주세요."
}
