import React, { useEffect, useState } from 'react';
import Reorder from 'react-reorder';
import move from 'lodash-move';
import * as json from './hack.json';
import './styles.css';
import ToggleButton from './ToggleButton';

const baseUrl = 'https://clash-of-coders.herokuapp.com';

function publishData(data) {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  const raw = JSON.stringify({
    data,
  });
  console.log('raw is....', raw);
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch(`${baseUrl}/updateDashboard`, requestOptions)
    .then(response => response.json())
    .then(result => console.log('result is....', result))
    .catch(error => console.log('error', error));
}

function App() {
  const [list, setList] = useState(json.data);
  const [inputJson, setInputJson] = useState();
  const [isError, setIsError] = useState(false);
  const [isJsonMode, setIsJsonMode] = useState(false);
  useEffect(() => {
    fetch(`${baseUrl}/my_dashboard`)
      .then(resp => resp.json())
      .then(res => JSON.parse(res.widgetList))
      .then(res => setList(res.data));
  }, []);
  const onReorder = (e, from, to) => {
    const t = move(list, from, to);
    console.log('reorder is...', t, from, to);
    setList(t);
  };

  function IsJsonString(str) {
    try {
      const parsed = JSON.parse(str);
      setIsError(false);
      return parsed;
    } catch (e) {
      setIsError(true);
      return false;
    }
  }

  function handleChange(event) {
    const text = event.target.value;
    IsJsonString(text);
    setInputJson(text);
  }

  function isThin(widgetId) {
    console.log('widgetId', widgetId);
    switch (widgetId) {
      case 14:
      case 13:
        return true;
      default:
        return false;
    }
  }

  return (
    <div className="App">
      <h1>Change Dashboard as you like and Publish</h1>
      <ToggleButton
        onChange={() => {
          setIsJsonMode(!isJsonMode);
        }}
      />
      <button
        style={{ margin: 10 }}
        type="submit"
        onClick={() => {
          console.log('pressed.....', isJsonMode, isError);
          if (isJsonMode) {
            if (isError) {
              console.log('can not publish invalid Json');
            } else {
              console.log('pressed..123...', inputJson);
              publishData(JSON.parse(inputJson));
            }
          } else {
            console.log('pressed..123...123123908', list);
            publishData(list);
          }
        }}
      >
        Publish
      </button>

      <hr />
      <div
        style={{
          background: '#ddd',
          padding: 20,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ flex: 2, opacity: isJsonMode ? '0.3' : '1' }}>
          <Reorder
            reorderId="my-list" // Unique ID that is used internally to track this list (required)
            reorderGroup="reorder-group" // A group ID that allows items to be dragged between lists of the same group (optional)
            // getRef={this.storeRef.bind(this)} // Function that is passed a reference to the root node when mounted (optional)
            component="div" // Tag name or Component to be used for the wrapping element (optional), defaults to 'div'
            placeholderClassName="placeholder" // Class name to be applied to placeholder elements (optional), defaults to 'placeholder'
            draggedClassName="dragged" // Class name to be applied to dragged elements (optional), defaults to 'dragged'
            lock="horizontal" // Lock the dragging direction (optional): vertical, horizontal (do not use with groups)
            holdTime={500} // Default hold time before dragging begins (mouse & touch) (optional), defaults to 0
            touchHoldTime={500} // Hold time before dragging begins on touch devices (optional), defaults to holdTime
            mouseHoldTime={200} // Hold time before dragging begins with mouse (optional), defaults to holdTime
            onReorder={onReorder} // Callback when an item is dropped (you will need this to update your state)
            autoScroll // Enable auto-scrolling when the pointer is close to the edge of the Reorder component (optional), defaults to true
            disabled={false} // Disable reordering (optional), defaults to false
            disableContextMenus // Disable context menus when holding on touch devices (optional), defaults to true
            placeholder={
              <div className="custom-placeholder" /> // Custom placeholder element (optional), defaults to clone of dragged element
            }
          >
            {list.map(item => (
              <div
                style={{
                  // height: 300,
                  width: '100%',
                  background: 'light grey',
                  margin: '20px 0px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                key={item.componentId}
              >
                <div style={{ display: 'inline-block' }}>
                  {/* {item.widgetName} */}
                  <img
                    src={`${baseUrl}/images/${item.widgetName}.jpg`}
                    alt={`${item.widgetName}`}
                    style={
                      isThin(item.widgetId)
                        ? { height: 20, width: 300 }
                        : { height: 300, width: 300 }
                    }
                  />
                </div>
              </div>
            ))}
          </Reorder>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            opacity: isJsonMode ? '1' : '0.3',
          }}
        >
          <textarea
            type="textarea"
            name="textValue"
            onChange={handleChange}
            value={inputJson}
            style={{ width: 300, height: 500, marginBottom: 50 }}
            className={isError ? 'error' : ''}
          />
        </div>
      </div>
    </div>
  );
}
export default App;
