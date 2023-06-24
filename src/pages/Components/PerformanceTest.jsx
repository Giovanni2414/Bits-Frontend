import {useLocation} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import {CRUDService, PERFORMANCE_TEST} from "../Services/axiosService";
import {MdCopyAll} from "react-icons/md";

export const PerformanceTest = () => {
    function useQuery() {
        const {search} = useLocation();

        return useMemo(() => new URLSearchParams(search), [search]);
    }

    const query = useQuery();
    const testingFrameworkPlatform = query.get("testingFrameworkPlatform");
    const weight = query.get("weight");
    const sessionId = query.get("sessionId");
    const [performanceTest, setPerformanceTest] = useState([])
    const [isCopied, setIsCopied] = useState(false);

    const body = {
        data: {
            testingFrameworkPlatform: testingFrameworkPlatform,
            weight: weight,
            sessionId: sessionId,
        },
        headers: CRUDService.getHeaderConfig()
    };

    const handleTooltipCopied = () => {
        console.log("Copied");
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    }

    useEffect(() => {
        CRUDService.post(body, PERFORMANCE_TEST).then((res) => {
            console.log(res.data.split("\n"));
            setPerformanceTest(res.data.split("\n"))
        });
    }, []);


    return (
        <div className="container mx-auto my-5 relative">
            <div className="mockup-code">
                {performanceTest.map((line, index) =>
                    <pre data-prefix={index} ><code>{line}</code></pre>
                )}
            </div>
            {performanceTest.length >0&&
                <div className={"tooltip tooltip-bottom absolute top-0 right-0 m-5 "+isCopied||"tooltip-open"} data-tip={isCopied?"Copied":"Click to copy"}>
                    <button
                        className="btn btn-square btn-outline"
                        onClick={() => {
                            navigator.clipboard.writeText(performanceTest.join("\n")).then(r => handleTooltipCopied())
                        }}
                    >
                        <MdCopyAll size={20}/>
                    </button>
                </div>
            }


        </div>
    )
}