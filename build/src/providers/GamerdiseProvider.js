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
import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchLogin } from "../fetches/fetchLogin";
import { fetchPostedItems } from "../fetches/fetchPostedItems";
import { fetchUserCartItems } from "../fetches/fetchUserCartItems";
import { fetchUserNotifications } from "../fetches/fetchUserNotifications";
var GamerdiseContext = createContext({
    isLoading: false,
    isErrorLoading: false,
    postedItems: [],
    userCartItems: [],
    userNotifications: [],
    categoryFilter: "",
    setCategoryFilter: function () { },
    searchInputFilter: "",
    setSearchInputFilter: function () { },
    onDisplayItem: null,
    setOnDisplayItem: function () { },
    loginToSite: function (_a) {
        var email = _a.email, password = _a.password;
    },
});
export var GamerdiseProvider = function (_a) {
    var children = _a.children;
    var _b = useState(false), isLoading = _b[0], setIsLoading = _b[1];
    var _c = useState(false), isErrorLoading = _c[0], setIsErrorLoading = _c[1];
    var _d = useState([]), postedItems = _d[0], setPostedItems = _d[1];
    var _e = useState([]), userCartItems = _e[0], setUserCartItems = _e[1];
    var _f = useState([]), userNotifications = _f[0], setUserNotifications = _f[1];
    var _g = useState(""), categoryFilter = _g[0], setCategoryFilter = _g[1];
    var _h = useState(""), searchInputFilter = _h[0], setSearchInputFilter = _h[1];
    var _j = useState(null), onDisplayItem = _j[0], setOnDisplayItem = _j[1];
    useEffect(function () {
        getPostedItems();
        getUserCartItems();
        getUserNotifications();
    }, []);
    var getPostedItems = function () {
        setIsLoading(true);
        fetchPostedItems()
            .then(function (response) { return response.json(); })
            .then(function (items) { return setPostedItems(items); })
            .catch(function (e) {
            setIsErrorLoading(true);
            console.error(e);
        })
            .finally(function () { return setIsLoading(false); });
    };
    var getUserCartItems = function () {
        if (localStorage.getItem("user")) {
            fetchUserCartItems()
                .then(function (response) { return response.json(); })
                .then(function (userCartItems) { return setUserCartItems(userCartItems); })
                .catch(function (e) { return console.error(e); });
        }
    };
    var getUserNotifications = function () {
        if (localStorage.getItem("user")) {
            fetchUserNotifications()
                .then(function (response) { return response.json(); })
                .then(function (notifications) { return setUserNotifications(notifications); })
                .catch(function (e) { return console.error(e); });
        }
    };
    var loginToSite = function (_a) {
        var email = _a.email, password = _a.password;
        return __awaiter(void 0, void 0, void 0, function () {
            var response, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, fetchLogin({ email: email, password: password })];
                    case 1:
                        response = _b.sent();
                        if (!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _b.sent();
                        localStorage.setItem("user", JSON.stringify(data));
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return (React.createElement(GamerdiseContext.Provider, { value: {
            isLoading: isLoading,
            isErrorLoading: isErrorLoading,
            postedItems: postedItems,
            userCartItems: userCartItems,
            userNotifications: userNotifications,
            categoryFilter: categoryFilter,
            setCategoryFilter: setCategoryFilter,
            searchInputFilter: searchInputFilter,
            setSearchInputFilter: setSearchInputFilter,
            onDisplayItem: onDisplayItem,
            setOnDisplayItem: setOnDisplayItem,
            loginToSite: loginToSite,
        } }, children));
};
export var useGamerdise = function () {
    var context = useContext(GamerdiseContext);
    return {
        isLoading: context.isLoading,
        isErrorLoading: context.isErrorLoading,
        postedItems: context.postedItems,
        userCartItems: context.userCartItems,
        userNotifications: context.userNotifications,
        categoryFilter: context.categoryFilter,
        setCategoryFilter: context.setCategoryFilter,
        searchInputFilter: context.searchInputFilter,
        setSearchInputFilter: context.setSearchInputFilter,
        onDisplayItem: context.onDisplayItem,
        setOnDisplayItem: context.setOnDisplayItem,
        loginToSite: context.loginToSite,
    };
};
