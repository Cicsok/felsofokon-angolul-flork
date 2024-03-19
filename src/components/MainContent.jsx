import {useHeaderContext} from "../store/contexts-provider";
import {useEffect, useState} from "react";
import {ERROR_TEXT} from "../data/static-data";
import MainContentFactory from "./Factory/MainContentFactory";
import {getPageContentData} from "../data/page-data-provider";

function isFetchFinished(data, error){
    return data || Object.values(error).length > 0;
}

function isErrorOccurred(error){
    return Object.values(error).length !== 0;
}

export default function MainContent() {
    const {currentLanguage, currentPage} = useHeaderContext();
    let initialErrorText = ERROR_TEXT[currentLanguage];
    const [pageContentData, setPageContentData] = useState('');
    const [error, setError] = useState({});

    function setInitialState(){
        setPageContentData('');
        setError({});
    }

    function savePageContentData(content){
        setPageContentData(content);
    }

    function populateError(error){
        setError({ message: error.message, statusCode: error.cause });
    }

    function detectMainContent(){
        const errorText = isErrorOccurred(error) && (initialErrorText+=error.statusCode);
        return isFetchFinished(pageContentData, error)
            ? <MainContentFactory page={currentPage} errorText={errorText} pageContentData={pageContentData}/>
            :  <p>Loading...</p>
    }

    useEffect( ()  => {
        async function fetchData(){
            try {
                setInitialState();
                const pageContentData = await getPageContentData(currentPage);
                if (pageContentData) {
                   savePageContentData(pageContentData);
                }
            } catch (error) {
                populateError(error);
            }
        }
        fetchData();
    }, [currentPage]);

    return detectMainContent();
}