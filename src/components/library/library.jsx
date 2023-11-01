import classNames from 'classnames';
import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

import LibraryItem from '../../containers/library-item.jsx';
import Modal from '../../containers/modal.jsx';
import Divider from '../divider/divider.jsx';
import Filter from '../filter/filter.jsx';
import TagButton from '../../containers/tag-button.jsx';
import Spinner from '../spinner/spinner.jsx';
import Separator from '../sidekick-extension-separator/separator.jsx';

// import storage from '../../lib/storage';

import styles from './library.css';

// import {isScratchDesktop} from '../../lib/isScratchDesktop';

const messages = defineMessages({
    filterPlaceholder: {
        id: 'gui.library.filterPlaceholder',
        defaultMessage: 'Search',
        description: 'Placeholder text for library search field'
    },
    allTag: {
        id: 'gui.library.allTag',
        defaultMessage: 'All',
        description: 'Label for library tag to revert to all items after filtering by tag.'
    }
});

const ALL_TAG = {tag: 'all', intlLabel: messages.allTag};
const tagListPrefix = [ALL_TAG];

// /**
//  * Find the AssetType which corresponds to a particular file extension. For example, 'png' => AssetType.ImageBitmap.
//  * @param {string} fileExtension - the file extension to look up.
//  * @returns {AssetType} - the AssetType corresponding to the extension, if any.
//  */
// const getAssetTypeForFileExtension = function (fileExtension) {
//     const compareOptions = {
//         sensitivity: 'accent',
//         usage: 'search'
//     };
//     for (const assetTypeId in storage.AssetType) {
//         const assetType = storage.AssetType[assetTypeId];
//         if (fileExtension.localeCompare(assetType.runtimeFormat, compareOptions) === 0) {
//             return assetType;
//         }
//     }
// };

// /**
//  * Figure out one or more icon(s) for a library item.
//  * If it's an animated thumbnail, this will return an array of `imageSource`.
//  * Otherwise it'll return just one `imageSource`.
//  * @param {object} item - either a library item or one of a library item's costumes.
//  *   The latter is used internally as part of processing an animated thumbnail.
//  * @returns {LibraryItem.PropTypes.icons} - an `imageSource` or array of them, ready for `LibraryItem` & `ScratchImage`
//  */
// const getItemIcons = function (item) {
//     const costumes = (item.json && item.json.costumes) || item.costumes;
//     if (costumes) {
//         return costumes.map(getItemIcons);
//     }

//     if (item.rawURL) {
//         return {
//             uri: item.rawURL
//         };
//     }

//     if (item.assetId && item.dataFormat) {
//         return {
//             assetId: item.assetId,
//             assetType: getAssetTypeForFileExtension(item.dataFormat)
//         };
//     }

//     const md5ext = item.md5ext || item.md5 || item.baseLayerMD5;
//     if (md5ext) {
//         const [assetId, fileExtension] = md5ext.split('.');
//         return {
//             assetId: assetId,
//             assetType: getAssetTypeForFileExtension(fileExtension)
//         };
//     }
// };

class LibraryComponent extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClose',
            'handleFilterChange',
            'handleFilterClear',
            'handleMouseEnter',
            'handleMouseLeave',
            'handlePlayingEnd',
            'handleSelect',
            'handleFavorite',
            'handleTagClick',
            'setFilteredDataRef'
        ]);
        const favorites = this.readFavoritesFromStorage();
        this.state = {
            playingItem: null,
            filterQuery: '',
            selectedTag: ALL_TAG.tag,
            // loaded: false,
            // data: props.data
            canDisplay: false,
            favorites,
            initialFavorites: favorites
        };
    }
    componentDidMount () {
        // Allow the spinner to display before loading the content
        // setTimeout(() => {
        //     this.setState({loaded: true});
        // });
        // if (this.state.data.then) {
        //     this.state.data.then(data => {
        //         this.setState({
        //             loaded: true,
        //             data
        //         });
        //     });
        // } else {
        //     setTimeout(() => {
        //         this.setState({loaded: true});
        
        // Rendering all the items in the library can take a bit, so:
        // Always show one frame with a loading spinner.
        setTimeout(() => {
            this.setState({
                canDisplay: true
            });
        // }
        });
        if (this.props.setStopHandler) this.props.setStopHandler(this.handlePlayingEnd);
    }
    componentDidUpdate (prevProps, prevState) {
        if (prevState.filterQuery !== this.state.filterQuery ||
            prevState.selectedTag !== this.state.selectedTag) {
            this.scrollToTop();
        }
        // if (prevProps.data !== this.props.data) {
        //     // eslint-disable-next-line react/no-did-update-set-state
        //     this.setState({
        //         data: this.props.data
        //     });

        if (this.state.favorites !== prevState.favorites) {
            try {
                localStorage.setItem(this.getFavoriteStorageKey(), JSON.stringify(this.state.favorites));
            } catch (error) {
                // ignore
            }
        }
    }
    handleSelect (id) {
        // this.handleClose();
        // const extension = this.getFilteredData()[id];
        // if (extension.href) {
        //     window.open(extension.href);
        this.handleClose();
        this.props.onItemSelected(this.getFilteredData()[id]);
    }
    readFavoritesFromStorage () {
        let data;
        try {
            data = JSON.parse(localStorage.getItem(this.getFavoriteStorageKey()));
        } catch (error) {
            // ignore
        }
        // if (!extension.href || isScratchDesktop()) {
        //     this.handleClose();
        if (!Array.isArray(data)) {
            data = [];
        }
        // this.props.onItemSelected(this.getFilteredData()[id]);
        return data;
    }
    // !!! KA !!!
    getFavoriteStorageKey () {
        return `sidekick:library-favorites:${this.props.id}`;
    }
    handleFavorite (id) {
        const data = this.getFilteredData()[id];
        const key = data[this.props.persistableKey];
        this.setState(oldState => ({
            favorites: oldState.favorites.includes(key) ? (
                oldState.favorites.filter(i => i !== key)
            ) : (
                [...oldState.favorites, key]
            )
        }));
    }
    handleClose () {
        this.props.onRequestClose();
    }
    handleTagClick (tag) {
        if (this.state.playingItem === null) {
            this.setState({
                filterQuery: '',
                selectedTag: tag.toLowerCase()
            });
        } else {
            this.props.onItemMouseLeave(this.getFilteredData()[[this.state.playingItem]]);
            this.setState({
                filterQuery: '',
                playingItem: null,
                selectedTag: tag.toLowerCase()
            });
        }
    }
    handleMouseEnter (id) {
        // don't restart if mouse over already playing item
        if (this.props.onItemMouseEnter && this.state.playingItem !== id) {
            this.props.onItemMouseEnter(this.getFilteredData()[id]);
            this.setState({
                playingItem: id
            });
        }
    }
    handleMouseLeave (id) {
        if (this.props.onItemMouseLeave) {
            this.props.onItemMouseLeave(this.getFilteredData()[id]);
            this.setState({
                playingItem: null
            });
        }
    }
    handlePlayingEnd () {
        if (this.state.playingItem !== null) {
            this.setState({
                playingItem: null
            });
        }
    }
    handleFilterChange (event) {
        if (this.state.playingItem === null) {
            this.setState({
                filterQuery: event.target.value,
                selectedTag: ALL_TAG.tag
            });
        } else {
            this.props.onItemMouseLeave(this.getFilteredData()[[this.state.playingItem]]);
            this.setState({
                filterQuery: event.target.value,
                playingItem: null,
                selectedTag: ALL_TAG.tag
            });
        }
    }
    handleFilterClear () {
        this.setState({filterQuery: ''});
    }
    getFilteredData () {
        // if (this.state.selectedTag === 'all') {
        //     if (!this.state.filterQuery) return this.state.data;
        //     return this.state.data.filter(dataItem => (
        //         (dataItem.tags || [])
        //             // Second argument to map sets `this`
        //             .map(String.prototype.toLowerCase.call, String.prototype.toLowerCase)
        //             .concat(dataItem.name ?
        //                 (typeof dataItem.name === 'string' ?
        //                 // Use the name if it is a string, else use formatMessage to get the translated name
        //                     dataItem.name : this.props.intl.formatMessage(dataItem.name.props)
        //                 ).toLowerCase() :
        //                 null)
        //             .join('\n') // unlikely to partially match newlines
        //             .indexOf(this.state.filterQuery.toLowerCase()) !== -1
        // When no filtering, favorites get their own section
        if (this.state.selectedTag === 'all' && !this.state.filterQuery) {
            const favoriteItems = this.props.data
                .filter(dataItem => (
                    this.state.initialFavorites.includes(dataItem[this.props.persistableKey])
                ))
                .map(dataItem => ({
                    ...dataItem,
                    key: `favorite-${dataItem[this.props.persistableKey]}`
                }));

            if (favoriteItems.length) {
                favoriteItems.push('---');
            }

            return [
                ...favoriteItems,
                ...this.props.data
            ];
        }

        // When filtering, favorites are just listed first, not in a separte section.
        const favoriteItems = [];
        const nonFavoriteItems = [];
        for (const dataItem of this.props.data) {
            if (dataItem === '---') {
                // ignore
            } else if (this.state.initialFavorites.includes(dataItem[this.props.persistableKey])) {
                favoriteItems.push(dataItem);
            } else {
                nonFavoriteItems.push(dataItem);
            }
        }

        let filteredItems = favoriteItems.concat(nonFavoriteItems);

        if (this.state.selectedTag !== 'all') {
            filteredItems = filteredItems.filter(dataItem => (
                dataItem.tags &&
                dataItem.tags.map(i => i.toLowerCase()).includes(this.state.selectedTag)
            ));
        }
        // return this.state.data.filter(dataItem => (
        //     dataItem.tags &&
        //     dataItem.tags
        //         .map(String.prototype.toLowerCase.call, String.prototype.toLowerCase)
        //         .indexOf(this.state.selectedTag) !== -1
        // ));

        if (this.state.filterQuery) {
            filteredItems = filteredItems.filter(dataItem => {
                const search = [...dataItem.tags];
                if (dataItem.name) {
                    // Use the name if it is a string, else use formatMessage to get the translated name
                    if (typeof dataItem.name === 'string') {
                        search.push(dataItem.name);
                    } else {
                        search.push(this.props.intl.formatMessage(dataItem.name.props));
                    }
                }
                if (dataItem.description) {
                    search.push(dataItem.description);
                }
                return search
                    .join('\n')
                    .toLowerCase()
                    .includes(this.state.filterQuery.toLowerCase());
            });
        }

        return filteredItems;
    }
    scrollToTop () {
        this.filteredDataRef.scrollTop = 0;
    }
    setFilteredDataRef (ref) {
        this.filteredDataRef = ref;
    }
    render () {
        return (
            <Modal
                fullScreen
                contentLabel={this.props.title}
                id={this.props.id}
                onRequestClose={this.handleClose}
            >
                {(this.props.filterable || this.props.tags) && (
                    <div className={styles.filterBar}>
                        {this.props.filterable && (
                            <Filter
                                className={classNames(
                                    styles.filterBarItem,
                                    styles.filter
                                )}
                                filterQuery={this.state.filterQuery}
                                inputClassName={styles.filterInput}
                                placeholderText={this.props.intl.formatMessage(messages.filterPlaceholder)}
                                onChange={this.handleFilterChange}
                                onClear={this.handleFilterClear}
                            />
                        )}
                        {this.props.filterable && this.props.tags && (
                            <Divider className={classNames(styles.filterBarItem, styles.divider)} />
                        )}
                        {this.props.tags &&
                            <div className={styles.tagWrapper}>
                                {tagListPrefix.concat(this.props.tags).map((tagProps, id) => (
                                    <TagButton
                                        active={this.state.selectedTag === tagProps.tag.toLowerCase()}
                                        className={classNames(
                                            styles.filterBarItem,
                                            styles.tagButton,
                                            tagProps.className
                                        )}
                                        key={`tag-button-${id}`}
                                        onClick={this.handleTagClick}
                                        {...tagProps}
                                    />
                                ))}
                            </div>
                        }
                    </div>
                )}
                <div
                    className={classNames(styles.libraryScrollGrid, {
                        [styles.withFilterBar]: this.props.filterable || this.props.tags
                    })}
                    ref={this.setFilteredDataRef}
                >
                    {(this.state.canDisplay && this.props.data) ? this.getFilteredData().map((dataItem, index) => (
                        dataItem === '---' ? (
                            <Separator key={index} />
                        ) : (
                            <LibraryItem
                                bluetoothRequired={dataItem.bluetoothRequired}
                                collaborator={dataItem.collaborator}
                                description={dataItem.description}
                                disabled={dataItem.disabled}
                                extensionId={dataItem.extensionId}
                                href={dataItem.href}
                                featured={dataItem.featured}
                                hidden={dataItem.hidden}
                                iconMd5={dataItem.costumes ? dataItem.costumes[0].md5ext : dataItem.md5ext}
                                iconRawURL={dataItem.rawURL}
                                icons={dataItem.costumes}
                                id={index}
                                incompatibleWithScratch={dataItem.incompatibleWithScratch}
                                favorite={this.state.favorites.includes(dataItem[this.props.persistableKey])}
                                onFavorite={this.handleFavorite}
                                insetIconURL={dataItem.insetIconURL}
                                internetConnectionRequired={dataItem.internetConnectionRequired}
                                isPlaying={this.state.playingItem === index}
                                key={dataItem.key || (
                                    typeof dataItem.name === 'string' ?
                                        dataItem.name :
                                        dataItem.rawURL
                                )}
                                name={dataItem.name}
                                credits={dataItem.credits}
                                samples={dataItem.samples}
                                docsURI={dataItem.docsURI}
                                showPlayButton={this.props.showPlayButton}
                                onMouseEnter={this.handleMouseEnter}
                                onMouseLeave={this.handleMouseLeave}
                                onSelect={this.handleSelect}
                            />
                        )
                    )) : (
                        <div className={styles.spinnerWrapper}>
                            <Spinner
                                large
                                level="primary"
                            />
                        </div>
                    )}
                </div>
            </Modal>
        );
    }
}

LibraryComponent.propTypes = {
    // !!! TODO? ???
    // data: PropTypes.oneOfType([PropTypes.arrayOf(
    //     /* eslint-disable react/no-unused-prop-types, lines-around-comment */
    //     // An item in the library
    //     PropTypes.shape({
    //         // @todo remove md5/rawURL prop from library, refactor to use storage
    //         md5: PropTypes.string,
    //         name: PropTypes.oneOfType([
    //             PropTypes.string,
    //             PropTypes.node
    //         ]),
    //         rawURL: PropTypes.string
    //     })
    //     /* eslint-enable react/no-unused-prop-types, lines-around-comment */
    // ), PropTypes.instanceOf(Promise)]),
    // !!! TODO? ???
    data: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.oneOfType([
            /* eslint-disable react/no-unused-prop-types, lines-around-comment */
            // An item in the library
            PropTypes.shape({
                // @todo remove md5/rawURL prop from library, refactor to use storage
                md5: PropTypes.string,
                name: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.node
                ]),
                rawURL: PropTypes.string
            }),
            PropTypes.string
            /* eslint-enable react/no-unused-prop-types, lines-around-comment */
        ])),
        PropTypes.instanceOf(Promise)
    ]),
    filterable: PropTypes.bool,
    id: PropTypes.string.isRequired,
    persistableKey: PropTypes.string,
    intl: intlShape.isRequired,
    onItemMouseEnter: PropTypes.func,
    onItemMouseLeave: PropTypes.func,
    onItemSelected: PropTypes.func,
    onRequestClose: PropTypes.func,
    setStopHandler: PropTypes.func,
    showPlayButton: PropTypes.bool,
    tags: PropTypes.arrayOf(PropTypes.shape(TagButton.propTypes)),
    title: PropTypes.string.isRequired
};

LibraryComponent.defaultProps = {
    filterable: true,
    persistableKey: 'name',
    showPlayButton: false
};

export default injectIntl(LibraryComponent);
