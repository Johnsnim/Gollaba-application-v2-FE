import CssBaseline from "@mui/material/CssBaseline"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useState } from "react"
import ButtonAppBar from "../../components/buttonAppBar"
import FooterNav from "../../components/footerNav"
import PollsMap from "../../components/polls/mapPoll"
import { useInView } from "react-intersection-observer"
import theme from "../../src/theme"
import axios from "axios"
import { useEffect } from "react"
import PollsMapFavorite from "../../components/account/mapPollFavorite"
import ApiGateway from "../../apis/ApiGateway"
import { useCookies } from "react-cookie"

const PollTheme = createTheme(theme)

export default function Mypolls(props) {
    let response
    const [polls, setPolls] = useState([])
    const [ref, inView] = useInView()
    const [isLoading, setIsLoading] = useState(false)
    const [offset, setOffset] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const [cookies, setCookies, removeCookies] = useCookies([])

    const getData = async () => {
        if (totalCount !== 0 && offset * 15 >= totalCount) return
        setIsLoading(true)
        response = await ApiGateway.getMyPolls(cookies.accessToken) // 아직 안만들어짐
        setPolls([...polls, ...response.polls])
        setTotalCount(response.totalCount)
        setIsLoading(false)
    }

    useEffect(() => {
        getData()
    }, [offset])

    if (polls !== undefined)
        return (
            <>
                <ThemeProvider theme={theme}>
                    <Container component="main" maxwidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 7,
                                marginBottom: 10,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "left",
                                justifyContent: "center",
                            }}
                        >
                            <div className="header">
                                <ButtonAppBar titletext={"My Polls"} />
                            </div>

                            <div className="body" flex="1">
                                <PollsMapFavorite data={polls} />
                                <Box ref={ref} />
                            </div>
                            <div className="footer">
                                <FooterNav />
                            </div>
                        </Box>
                    </Container>
                </ThemeProvider>
            </>
        )
}
