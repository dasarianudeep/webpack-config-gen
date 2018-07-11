import React, {Component} from 'react';
import { debounce } from 'lodash';
import ClipboardJS from "clipboard";
import GridRow from "../GridRow";
import Panel from "../Panel";
import TextInput from "../TextInput";
import RadioGroup from "../RadioGroup";
import CheckBox from "../CheckBox";
import InputError from "../InputError";
import ClipBoardCopy from "../ClipBoardCopy";
import "./style.css";
import { transpilationOptions, csspreprocessorOptions, lintOptions, formatOutputConfig, validateAssetDir, validateEntry, getErrorClassName} from "./util";
import {getConfig} from "../../lib/index.js";

class ConfigContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cssextract: false,
            selOption__transpilation: '',
            selOption__csspreprocessor: '',
            selOption__lint: '',
            entry: 'src/index.js',
            assetdir: 'static',
            mode: false,
            sourcemaps: false,
            outputString: '',
            errorMessages: {
                entry: [],
                assetdir: []
            },
            importStatements: [],
            dependenciesList: [],
            copyLabel__dep: 'COPY',
            copyLabel__out: 'COPY'
        };
        this.handleChangeEntry = this.handleChangeEntry.bind(this);
        this.handleChangeAsset = this.handleChangeAsset.bind(this);
        this.handleChangeTraspilation = this.handleChangeTraspilation.bind(this);
        this.handleChangeCssPreprocessor = this.handleChangeCssPreprocessor.bind(this);
        this.handleChangeLint = this.handleChangeLint.bind(this);
        this.handleChangeExtractCSS = this.handleChangeExtractCSS.bind(this);
        this.handleChangeMode = this.handleChangeMode.bind(this);
        this.handleChangeSourceMaps = this.handleChangeSourceMaps.bind(this);
        this.handleCopyButtonClick = this.handleCopyButtonClick.bind(this);

        this.debounceChangeHandler = debounce(() => {
            this.updateWebPackConfig();
        }, 750);
    }

    componentDidMount() {
        this.setState({
            outputString: formatOutputConfig(getConfig().finalwebpackConfig)
        }, () => new ClipboardJS(".copy__btn"));
    }

    handleChangeEntry(e) {
        e.persist();
        const prevState = this.state;
        this.setState({[e.target.name]: e.target.value}, () => {
            const validationError = validateEntry(e.target.value);
            if (validationError) {
                if (!this.state.errorMessages.entry.includes(validationError)) {
                    this.setState({
                        errorMessages: { entry: prevState.errorMessages.entry.concat(validationError),
                            assetdir: prevState.errorMessages.assetdir
                        }
                    });
                }
            } else {
                if (prevState.errorMessages.entry) {
                    this.setState({
                        errorMessages: { entry: [], assetdir: prevState.errorMessages.assetdir }
                    }, () => this.debounceChangeHandler());
                } else {
                    this.debounceChangeHandler();
                }
            }
        });

    }

    handleChangeAsset(e) {
        e.persist();
        const prevState = this.state;
        this.setState({[e.target.name]: e.target.value}, () => {
            const validationError = validateAssetDir(e.target.value);
            if (validationError) {
                if (!this.state.errorMessages.assetdir.includes(validationError)) {
                    this.setState({
                        errorMessages: { assetdir: prevState.errorMessages.assetdir.concat(validationError),
                            entry: prevState.errorMessages.entry
                        }
                    });
                }
            } else {
                if (prevState.errorMessages.assetdir) {
                    this.setState({
                        errorMessages: { assetdir: [], entry: prevState.errorMessages.entry }
                    }, () => this.debounceChangeHandler());
                } else {
                    this.debounceChangeHandler();
                }
            }
        });
    }

    handleChangeTraspilation(e) {
        this.setState({selOption__transpilation: e.target.value}, () => {
            this.updateWebPackConfig();
        });
    }

    handleChangeCssPreprocessor(e) {
        this.setState({ selOption__csspreprocessor: e.target.value, cssextract: false }, () => {
            this.updateWebPackConfig();
        });
    }

    handleChangeLint(e) {
        this.setState({ selOption__lint: e.target.value}, () => {
            this.updateWebPackConfig();
        });
    }

    handleChangeExtractCSS(e) {
        this.setState({ cssextract: e.target.checked }, () => {
            this.updateWebPackConfig();
        });
    }

    handleChangeMode(e) {
        this.setState({ mode:  e.target.checked }, () => {
            this.updateWebPackConfig();
        })
    }

    handleChangeSourceMaps(e) {
        this.setState({ sourcemaps:  e.target.checked }, () => {
            this.updateWebPackConfig();
        })
    }

    handleCopyButtonClick(e) {
        this.setState({
            [e.target.id]: 'COPIED!'
        })
    }

    updateWebPackConfig() {
        const webpackOutput = getConfig({
            initial: {
                entry: this.state.entry,
                dir: this.state.assetdir
            },
            transpilation: this.state.selOption__transpilation,
            style: this.state.selOption__csspreprocessor,
            lint: this.state.selOption__lint,
            other: {
                cssextract: this.state.cssextract,
                mode: this.state.mode,
                sourcemaps: this.state.sourcemaps
            }
        });
        const config = webpackOutput.finalwebpackConfig;
        const prevState = this.state;
        let importStatements = prevState.importStatements;
        const minifyCssImport = 'const MiniCssExtractPlugin = require("mini-css-extract-plugin");';
        if (this.state.cssextract) {
            if (!prevState.importStatements.includes(minifyCssImport)) {
                importStatements = prevState.importStatements.concat(minifyCssImport);
            }
        } else {
            if (prevState.importStatements.includes(minifyCssImport)) {
                importStatements = prevState.importStatements.filter(statement => statement !== minifyCssImport);
            }
        }
        this.setState({
            outputString : formatOutputConfig(config),
            importStatements,
            dependenciesList: webpackOutput.dependencyLoaders,
            copyLabel__dep: 'COPY',
            copyLabel__out: 'COPY'
        });
    }

    render() {
        const errorEntry = getErrorClassName(this.state.errorMessages, "Entry", "entry") ? "error__input": "";
        const errorAsset = getErrorClassName(this.state.errorMessages, "Destination", "assetdir") ? "error__input": "";
        return (
            <GridRow>
                <div className="config__params">
                    <div className="config__panel">
                        <Panel title="Entry Point &  Destination" className="entry__panel">
                            {(this.state.errorMessages.entry.length > 0 || this.state.errorMessages.assetdir.length > 0) && (
                                <InputError errorMessages={this.state.errorMessages} />
                            )}
                            <TextInput id="entry" name="entry" value={this.state.entry} className={["entry__control", errorEntry]} onChange={this.handleChangeEntry}>
                                Entry File:
                            </TextInput>
                            <TextInput id="assetdir" name="assetdir" value={this.state.assetdir} className={["entry__control", errorAsset]} onChange={this.handleChangeAsset}>
                                 Dest Dir:
                            </TextInput>
                            <CheckBox id="config-mode" name="config-mode" value="isproduction" checked={this.state.mode} onChange={this.handleChangeMode}>Production Mode</CheckBox>
                            <CheckBox id="config-sourcemap" name="config-sourcemap" value="issourcemaps" checked={this.state.sourcemaps} onChange={this.handleChangeSourceMaps}>Enable Source Maps</CheckBox>
                        </Panel>
                    </div>
                    <div className="config__panel">
                        <Panel title="Transpilation" className="transpilation__panel">
                            <RadioGroup radioOptions={transpilationOptions} onChange={this.handleChangeTraspilation} selOption={this.state.selOption__transpilation}/>
                        </Panel>
                    </div>
                    <div className="config__panel">
                        <Panel title="CSS Preprocessors" className="csspreprocessor__panel">
                            <RadioGroup radioOptions={csspreprocessorOptions} onChange={this.handleChangeCssPreprocessor} selOption={this.state.selOption__csspreprocessor}/>
                            <CheckBox id="extract-css" name="extract-css" value="cssextract" checked={this.state.cssextract} onChange={this.handleChangeExtractCSS} disabled={this.state.selOption__csspreprocessor === '' ? true: false}>Extract to CSS file</CheckBox>
                        </Panel>
                    </div>
                    <div className="config__panel">
                        <Panel title="Linting" className="lint__panel">
                            <RadioGroup radioOptions={lintOptions} onChange={this.handleChangeLint} selOption={this.state.selOption__lint}/>
                        </Panel>
                    </div>
                </div>
                <div className="config__output">
                    <pre>
                        <ClipBoardCopy target="#webpackconfig__out" id="copyLabel__out" className="copy__configoutput" label={this.state.copyLabel__out} handleCopyButtonClick={this.handleCopyButtonClick} />
                        <div>{this.state.importStatements.join('')}</div><br/>
                        <div id="webpackconfig__out">{this.state.outputString}</div>
                    </pre>
                    {
                        this.state.dependenciesList.length > 0 && (
                            <div className="dependencies__list">
                                <ClipBoardCopy target="#webpack__deps" className="copy__deps" id="copyLabel__dep" label={this.state.copyLabel__dep} handleCopyButtonClick={this.handleCopyButtonClick} />
                                <span id="webpack__deps">npm install {this.state.dependenciesList.join(" ")} --save-dev</span>
                            </div>
                        )
                    }
                </div>
            </GridRow>
        )
    }
}

export default ConfigContainer;
