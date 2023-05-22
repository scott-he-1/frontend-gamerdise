import React from "react";
export var CreateAccountInputBase = function (_a) {
    var label = _a.label, name = _a.name, type = _a.type, inputValue = _a.inputValue, errorM = _a.errorM, updateInputFields = _a.updateInputFields;
    return (React.createElement("div", { className: "loginInputBase" },
        React.createElement("div", { className: "loginLabel" }, label),
        React.createElement("input", { className: "loginInput", type: type, name: name, value: inputValue, onChange: updateInputFields, maxLength: 30 }),
        errorM && React.createElement("div", { className: "loginErrorM" }, errorM)));
};
