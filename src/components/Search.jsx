import React, { useState } from "react";
import '../styles/search.css';

const Search = () => {
    const baseURL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

    const [word, setWord] = useState("");
    const [data, setData] = useState([]);

    const searchService = async (event) => {
        event.preventDefault();
        const response = await fetch(baseURL + word);
        const data = await response.json();
        setData(data[0].meanings);
    };

    const Result = () => {
        return (
        <div className="container-fluid mt-5 result">
            <div className="div1">
                <h5 className="font-weight-light text-capitalize">definition</h5>
                <ul className="p-4">
                    { data.map((meaning, index1) => { return (<React.Fragment key={ index1 }>
                        {
                            meaning.definitions.map((def, index2) => {
                                return (<li key={ index2 } className="mb-0">
                                        <p className="text-dark mb-2 text-justify">
                                            <span className="text-capitalize text-muted">{ (meaning.partOfSpeech != null) ? "[" + meaning.partOfSpeech + "] ": null }</span>
                                            { def.definition }
                                            <span className="font-italic text-muted">{ (def.example != null) ? " (E.g.) " + def.example : null }</span>
                                        </p>
                                </li>)
                            })
                        }
                    </React.Fragment>) }) }
                </ul>
            </div>
            <div className="div-2">
                <div className="div-2-inner-1 text-justify mt-5">
                    <h5 className="font-weight-light text-capitalize">synonyms</h5>
                    <ul className="ul-list p-4">
                        { data.map((meaning, index1) => { return (<React.Fragment key={ index1 }>
                            {
                                meaning.synonyms.map((synonym, index2) => {
                                    return (<li key={ index2 } className="inner-li mb-0">
                                            <p className="text-dark mb-2 text-justify">
                                                { synonym }
                                            </p>
                                    </li>)
                                })
                            }
                        </React.Fragment>) }) }
                    </ul>
                </div>
                <div className="div-2-inner-2 text-justify mt-5">
                    <h5 className="font-weight-light text-capitalize">antonyms</h5>
                    <ul className="ul-list p-4">
                        { data.map((meaning, index1) => { return (<React.Fragment key={ index1 }>
                            {
                                meaning.antonyms.map((antonym, index2) => {
                                    return (<li key={ index2 } className="inner-li mb-0">
                                            <p className="text-dark mb-2 text-justify">
                                                { antonym }
                                            </p>
                                    </li>)
                                })
                            }
                        </React.Fragment>) }) }
                    </ul>
                </div>
            </div>
        </div>    
        );
    }

    return (<React.Fragment>
        <div className="container-fluid mt-5 clearfix">
            <div className="mb-3 float-right">
                <h1 className="font-weight-light text-uppercase">Dictionary</h1>
            </div>
            <div className="form-group mb-3 float-left">
                <form className="form-inline" onSubmit={ searchService }>
                    <input value={ word } 
                    onChange={ (e) => {setWord(e.target.value)} }
                    className="form-control" 
                    type="text" 
                    placeholder="Search For A Word" />
                    <button className="btn btn-secondary ml-2" type="submit" onClick={ searchService }>Search</button>
                </form>
            </div>
        </div>
        {data.length ? <Result /> : null}
    </React.Fragment>);
};

export default Search;