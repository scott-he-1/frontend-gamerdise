import React from "react";
export var PostAnItemInputBase = function (_a) {
    var name = _a.name, label = _a.label, type = _a.type, value = _a.value, selectOptions = _a.selectOptions, updateInputFields = _a.updateInputFields, specialSymbol = _a.specialSymbol, errorM = _a.errorM;
    var Input = function (type) {
        switch (type) {
            case "select":
                return (React.createElement("select", { name: name, id: name, onChange: updateInputFields }, selectOptions
                    ? selectOptions.map(function (option) { return (React.createElement("option", { key: option, value: option }, option)); })
                    : null));
            case "textArea":
                return (React.createElement("textarea", { name: name, id: name, cols: 30, rows: 10, style: { resize: "none" }, value: value, onChange: updateInputFields }));
            default:
                return (React.createElement("div", { className: "inputContainer" },
                    specialSymbol && specialSymbol,
                    React.createElement("input", { type: "text", name: name, onChange: updateInputFields, value: value })));
        }
    };
    return (React.createElement("div", { className: "postAnItemInputBase" },
        React.createElement("h3", null, label),
        Input(type),
        errorM && React.createElement("div", { className: "sellItemInputErrorM" }, errorM)));
};
