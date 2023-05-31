import React from "react";
export var LoginComponentInputBase = function (_a) {
    var label = _a.label, name = _a.name, type = _a.type, errorM = _a.errorM, updateInputFields = _a.updateInputFields;
    return (React.createElement("div", { className: "loginInputBase" },
        React.createElement("div", { className: "loginLabel" }, label),
        React.createElement("input", { className: "loginInput", type: type, name: name, onChange: updateInputFields, maxLength: 30 }),
        errorM && React.createElement("div", { className: "loginErrorM" }, errorM)));
};
