var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React, { useState } from "react";
import { createAccount } from "../../fetches/createAccount";
import { CreateAccountInputBase } from "./CreateAccountInputBase";
var INIT_CREATE_ACCOUNT_INPUTS = {
    email: "",
    password: "",
    confirmPassword: "",
};
export var CreateAccount = function () {
    var _a = useState(INIT_CREATE_ACCOUNT_INPUTS), createAccountInputs = _a[0], setCreateAccountInputs = _a[1];
    var _b = useState({}), errorM = _b[0], setErrorM = _b[1];
    var _c = useState(true), hidePassword = _c[0], setHidePassword = _c[1];
    var updateInputFields = function (e) {
        setCreateAccountInputs(function (prevState) {
            var _a;
            return (__assign(__assign({}, prevState), (_a = {}, _a["".concat(e.target.name)] = e.target
                .value, _a)));
        });
    };
    var submitNewAccount = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var email, password, confirmPassword, allClear, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    email = createAccountInputs.email, password = createAccountInputs.password, confirmPassword = createAccountInputs.confirmPassword;
                    allClear = true;
                    Object.keys(createAccountInputs).forEach(function (input) {
                        var errorText = "";
                        switch (input) {
                            case "email":
                                if (email.length <= 0) {
                                    errorText = "Please enter an email";
                                }
                                else if (!email.includes(".com")) {
                                    errorText = "Please enter a valid email";
                                }
                                else {
                                    errorText = "";
                                }
                                setErrorM(function (prevState) { return (__assign(__assign({}, prevState), { emailError: errorText })); });
                                if (errorText !== "") {
                                    allClear = false;
                                }
                                break;
                            case "password":
                                if (password.length <= 0) {
                                    errorText = "Please enter a password";
                                }
                                else {
                                    errorText = "";
                                }
                                setErrorM(function (prevState) { return (__assign(__assign({}, prevState), { passwordError: errorText })); });
                                if (errorText !== "") {
                                    allClear = false;
                                }
                                break;
                            case "confirmPassword":
                                if (password !== confirmPassword) {
                                    errorText = "Passwords must match";
                                }
                                else {
                                    errorText = "";
                                }
                                setErrorM(function (prevState) { return (__assign(__assign({}, prevState), { confirmPasswordError: errorText })); });
                                if (errorText !== "") {
                                    allClear = false;
                                }
                                break;
                            default:
                                break;
                        }
                    });
                    if (!allClear) return [3 /*break*/, 2];
                    return [4 /*yield*/, createAccount({ email: email, password: password })];
                case 1:
                    response = _a.sent();
                    if (response.ok) {
                        alert("Successfully Created Account!");
                        setCreateAccountInputs(INIT_CREATE_ACCOUNT_INPUTS);
                    }
                    else if (response.status === 409) {
                        setErrorM(function (prevState) { return (__assign(__assign({}, prevState), { emailError: "Email Already Exists" })); });
                    }
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    var createAccountFields = [
        { label: "Email", name: "email", type: "text" },
        {
            label: "Password",
            name: "password",
            type: hidePassword ? "password" : "text",
        },
        {
            label: "Confirm Password",
            name: "confirmPassword",
            type: hidePassword ? "password" : "text",
        },
    ];
    return (React.createElement(React.Fragment, null,
        React.createElement("form", { onSubmit: submitNewAccount, className: "createAccountForm" },
            createAccountFields.map(function (field) { return (React.createElement(CreateAccountInputBase, { key: field.name, label: field.label, name: field.name, type: field.type, inputValue: createAccountInputs[field.name], updateInputFields: updateInputFields, errorM: errorM["".concat(field.name, "Error")] &&
                    errorM["".concat(field.name, "Error")].length > 0
                    ? errorM["".concat(field.name, "Error")]
                    : null })); }),
            React.createElement("button", { className: "signInButton" }, "Create Account"))));
};
