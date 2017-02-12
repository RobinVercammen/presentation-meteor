export default (elementName, evt) => {
    return evt.target[elementName].value;
}
