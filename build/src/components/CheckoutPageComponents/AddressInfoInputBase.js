import React from "react";
export var AddressInfoInputBase = function (_a) {
    var label = _a.label, name = _a.name, type = _a.type, value = _a.value, errorM = _a.errorM, selectOptions = _a.selectOptions, updateAddressInfoInputs = _a.updateAddressInfoInputs;
    switch (type) {
        case "select":
            return (React.createElement("div", null,
                React.createElement("div", { className: "addressInfoLabel" }, label),
                React.createElement("select", { name: name, id: name, onChange: function (e) { return updateAddressInfoInputs(e); } }, selectOptions &&
                    selectOptions.map(function (option) { return (React.createElement("option", { key: option, value: option }, option)); })),
                errorM && React.createElement("div", { className: "addressInputErrorM" }, errorM)));
        default:
            return (React.createElement("div", null,
                React.createElement("div", { className: "addressInfoLabel" }, label),
                React.createElement("input", { type: type, name: name, onChange: function (e) { return updateAddressInfoInputs(e); }, value: value }),
                errorM && React.createElement("div", { className: "addressInputErrorM" }, errorM)));
    }
};
