import React, { useState, useEffect } from "react"
import CssBaseline from "@mui/material/CssBaseline"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import { Icon } from "@mui/material"
import { useInView } from "react-intersection-observer"

import axios from "axios"
import ButtonAppBar from "../components/buttonAppBar"
import FooterNav from "../components/footerNav"
import PollsMap from "../components/polls/mapPoll"
import theme from "../src/theme"
import ApiGateway from "../apis/ApiGateway"

import OngoingPolls from "../components/main/ongoingPolls"
import TopTen from "../components/main/TopTen"
import WholeView from "../components/main/wholeView"

const PollTheme = createTheme(theme)

export default function Main() {
    const [polls, setPolls] = useState([])
    const [topTenPolls, setTopTenPolls] = useState([])
    const [trendingPolls, setTrendingPolls] = useState([])

    let response, topTenResponse, trendingResponse
    const offset = 0
    const limit = 10

    const getData = async () => {
        /*
        topTenResponse = await ApiGateway.topPolls()
        setTopTenPolls([...topTenPolls, ...topTenResponse.polls])

        trendingResponse = await ApiGateway.trendingPolls()
        setTrendingPolls([...trendingPolls, ...trendingResponse.polls])
        */
        response = await ApiGateway.getPolls(offset, limit)
        console.log(response.data.items)
        //setPolls((prevPolls) => [...prevPolls, response.data.polls])
        setPolls([...polls, ...response.data.items])
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 9,
                        marginBottom: 7,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "left",
                        justifyContent: "center",
                        height: "83vh",
                        maxHeight: "83vh",
                        overflow: "hidden",
                    }}
                >
                    <div className="header">
                        <ButtonAppBar titletext={""} />
                    </div>
                    <Box
                        className="body"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            flex: 1,
                            overflow: "auto",
                            maxHeight: "90vh",
                        }}
                    >
                        {/*
                        <TopTen data={topTenPolls} menuTitle={"Ongoing Polls"} />
                        <OngoingPolls data={trendingPolls} menuTitle={"New Results!"} />
                    */}
                        <WholeView data={polls} />
                    </Box>

                    <div className="footer">
                        <FooterNav />
                    </div>
                </Box>
            </Container>
        </ThemeProvider>
    )
}
