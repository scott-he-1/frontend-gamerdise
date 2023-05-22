import React from "react";
export var CardInfoInputBase = function (_a) {
    var label = _a.label, name = _a.name, type = _a.type, value = _a.value, errorM = _a.errorM, selects = _a.selects, updateUserCartInfoInputs = _a.updateUserCartInfoInputs, maxLength = _a.maxLength;
    switch (type) {
        case "multiSelect":
            return (React.createElement(React.Fragment, null,
                React.createElement("div", { className: "cardInfoLabel" }, label),
                React.createElement("div", { className: "cardInfoSelectContainer" }, selects
                    ? selects.length > 0
                        ? selects.map(function (select) { return (React.createElement("div", { key: select.name },
                            React.createElement("div", null, select.label),
                            React.createElement("select", { name: select.name, id: select.name, onChange: function (e) { return updateUserCartInfoInputs(e); } }, select.selectOptions.map(function (item) { return (React.createElement("option", { key: item, value: item }, item)); })))); })
                        : null
                    : null),
                errorM && React.createElement("div", { className: "cardInfoInput error" }, errorM)));
        default:
            return (React.createElement("div", { className: "cardInfoInput" },
                React.createElement("div", { className: "cardInfoLabel" }, label),
                React.createElement("input", { type: type, name: name, value: value, maxLength: maxLength && maxLength, onChange: function (e) { return updateUserCartInfoInputs(e); } }),
                errorM && React.createElement("div", { className: "cardInfoInput error" }, errorM)));
    }
};
