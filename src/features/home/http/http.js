import { request, requestWithQueue } from '../../../tools';
import { version } from '../../../../package.json';
import Global from '../../../common/global';

export default class Http {

    static _createRequestBody(body = {}, requestTo = Global.HTTP_REQUEST_TO_YSB) {
        let retBody = {};
        /**
         * @TODO {
         *   what 区分请求是药师助手（药师帮）接口还是辅助问诊接口
         *   why 系统需要调用两套接口，两套接口要求的数据格式不一致
         *   how 根据传入的requestTo来区分请求的哪一套接口
         * }
         */
        if (requestTo === Global.HTTP_REQUEST_TO_YSB) {
            //是否是药师帮的标识位
            const isYSB = !localStorage.getItem('accessToken');
            if (isYSB) {
                retBody = {
                    // appId: localStorage.getItem('appId'),
                    appId: "1",
                    nonceStr: '1',
                    sign: '1',
                    data: {
                        userId: "1",
                        version: version,
                        appId: "1",
                        ...body,
                    },
                };
            } else {
                retBody = {
                    accessToken: localStorage.getItem('accessToken'),
                    timestamp: new Date().getTime() / 1000,
                    version: version,
                    reqData: {
                        ...body,
                    },
                };
            }
        } else if (requestTo === Global.HTTP_REQUEST_TO_INQUIRY) {
            retBody = { ...body };
        } else if (requestTo === Global.HTTP_REQUEST_TO_LOCAL) {
            retBody = { ...body };
        }


        return retBody;
    };

    static _header = {
        'Content-Type': 'application/json',
        // 'With-Credentials': 'true',
    };

    static getPageSizeByWindowHeight() {
        return parseInt(String(window.innerHeight / 40 * 2));
    }

    //@TODO 获取所有药品的全部分类
    static getDrugTypeList(callback) {

        // requestWithQueue(`/getDrugTypeList`, {
        //   method: 'post',
        //   body: JSON.stringify(this._createRequestBody()),
        //   headers: this._header,
        // }, callback);

        request(`/getDrugTypeList`, {
            method: 'post',
            body: JSON.stringify(this._createRequestBody()),
            headers: this._header,
        }).then((data) => {
            callback(data);
        });
    }

    // 删除相互作用历史记录
    static delInteractionHistory(drug1, drug2 = '', callback) {
        const body = {
            drug1: drug1,
            drug2: drug2,
        };

        // requestWithQueue(`/delInteractionHistory`, {
        //   method: 'post',
        //   body: JSON.stringify(this._createRequestBody(body)),
        //   headers: this._header,
        // }, callback);

        request(`/delInteractionHistory`, {
            method: 'post',
            body: JSON.stringify(this._createRequestBody(body)),
            headers: this._header,
        }).then((data) => {
            callback(data);
        });
    }

    // 删除所有相互作用历史记录
    static clearInteractionHistory(callback) {

        // requestWithQueue(`/clearInteractionHistory`, {
        //   method: 'post',
        //   body: JSON.stringify(this._createRequestBody()),
        //   headers: this._header,
        // }, callback);

        request(`/clearInteractionHistory`, {
            method: 'post',
            body: JSON.stringify(this._createRequestBody()),
            headers: this._header,
        }).then((data) => {
            callback(data);
        });
    }

    // 删除智能搜索历史记录
    static delSearchingHistory(searchText, callback) {
        const body = {
            searchText: searchText,
        };

        // requestWithQueue(`/delSearchingHistory`, {
        //   method: 'post',
        //   body: JSON.stringify(this._createRequestBody(body)),
        //   headers: this._header,
        // }, callback);

        request(`/delSearchingHistory`, {
            method: 'post',
            body: JSON.stringify(this._createRequestBody(body)),
            headers: this._header,
        }).then((data) => {
            callback(data);
        });
    }

    // 删除所有智能搜索历史记录
    static clearSearchingHistory(callback) {

        // requestWithQueue(`/clearSearchingHistory`, {
        //   method: 'post',
        //   body: JSON.stringify(this._createRequestBody()),
        //   headers: this._header,
        // }, callback);

        request(`/clearSearchingHistory`, {
            method: 'post',
            body: JSON.stringify(this._createRequestBody()),
            headers: this._header,
        }).then((data) => {
            callback(data);
        });
    }

    //@TODO 根据疾病获取相关药品
    static getDrugListByDiseaseId(id, callback) {
        const body = {
            id: id,
        };

        // requestWithQueue(`/getDrugListByDiseaseId`, {
        //   method: 'post',
        //   body: JSON.stringify(this._createRequestBody(body)),
        //   headers: this._header,
        // }, callback);

        request(`/getDrugListByDiseaseId`, {
            method: 'post',
            body: JSON.stringify(this._createRequestBody(body)),
            headers: this._header,
        }).then((data) => {
            callback(data);
        });
    }

    //@TODO 根据科室获取疾病列表
    static getDiseaseByDepartmentName(department, callback) {
        const body = {
            department: department,
        };

        // requestWithQueue(`/getDiseaseByDepartmentName`, {
        //   method: 'post',
        //   body: JSON.stringify(this._createRequestBody(body)),
        //   headers: this._header,
        // }, callback);

        request(`/getDiseaseByDepartmentName`, {
            method: 'post',
            body: JSON.stringify(this._createRequestBody(body)),
            headers: this._header,
        }).then((data) => {
            callback(data);
        });
    }

    //@TODO 获取疾病科室分类
    static getDiseaseDepartmentList(callback) {

        // requestWithQueue(`/getDiseaseDepartmentList`, {
        //   method: 'post',
        //   body: JSON.stringify(this._createRequestBody()),
        //   headers: this._header,
        // }, callback);

        request(`/getDiseaseDepartmentList`, {
            method: 'post',
            body: JSON.stringify(this._createRequestBody()),
            headers: this._header,
        }).then((data) => {
            callback(data);
        });
    }

    //@TODO 根据药品的唯一id检索药品详情
    static getDrugDetailById(id, callback) {
        const body = {
            id: id,
        };

        // requestWithQueue(`/getDrugDetailById`, {
        //   method: 'post',
        //   body: JSON.stringify(this._createRequestBody(body)),
        //   headers: this._header,
        // }, callback);

        return request(`/getDrugDetailById`, {
            method: 'post',
            body: JSON.stringify(this._createRequestBody(body)),
            headers: this._header,
        }).then((data) => {
            callback(data);
        });
    }

    //@TODO 根据西药成分id和剂型检索所有药品
    static getWesternMedicineByPharmaceuticalId(id, form, callback) {
        const body = {
            id: id,
            form: form,
        };

        return request(`/getWesternMedicineByPharmaceuticalId`, {
            method: 'post',
            body: JSON.stringify(this._createRequestBody(body)),
            headers: this._header,
        }).then((data) => {
            console.log(data.drugList && data.drugList.length > 0);
            if (data.drugList && data.drugList.length > 0) {
                let resultList = [];
                for (let i = 0; i < data.drugList.length; i++) {
                    let tempObj = {
                        id: data.drugList[i].id,
                        name: data.drugList[i].tradeName,
                        tradeName: data.drugList[i].tradeName,
                        productName: data.drugList[i].productName,
                        form: data.drugList[i].form,
                        specification: data.drugList[i].specification,
                        isOTC: data.drugList[i].isOTC,
                        otctype: data.drugList[i].otctype,
                        manufacturer: data.drugList[i].manufacturer,
                        manufacturerNameEng: data.drugList[i].manufacturerNameEng,
                        insuranceClassification: data.drugList[i].insuranceClassification,
                        classification: data.drugList[i].classification,
                        indication: data.drugList[i].indication,
                        type: 'card',
                    };
                    let isExist = false;
                    for (let j = 0; j < resultList.length; j++) {
                        if (resultList[j].name === data.drugList[i].productName) {
                            isExist = true;
                            resultList[j].productList.push(tempObj);
                        }
                    }
                    if (!isExist) {
                        resultList.push({
                            id: data.drugList[i].id,
                            name: data.drugList[i].productName,
                            type: 'drugNum',
                            productList: [tempObj],
                        });
                    }
                }
                // return { drugList: resultList };
                callback({ drugList: resultList });
            } else {
                callback(data);
            }

        });
    }

    //@TODO 根据药品类获取类别下的所有包含内容
    static getItemsByDrugType(type, name = '', callback) {
        const body = {
            typeGroup: type,
            typeName: name,
        };
        // if (name === '其他中成药' || type === 'healthcareMedicineType') {
        //   body.pageNum = page;
        //   body.pageSize = this.getPageSizeByWindowHeight();
        // }
        // requestWithQueue(`/getItemsByDrugType`, {
        //   method: 'post',
        //   body: JSON.stringify(this._createRequestBody(body)),
        //   headers: this._header,
        // }, (data) => {
        //   if (type === 'healthcareMedicineType' || type === 'chineseMedicineType') {
        //     //根据药品名聚合
        //     let resultList = [];
        //     for (let i = 0; i < data.drugList.length; i++) {
        //       let tempObj = {
        //         id: data.drugList[i].id,
        //         name: data.drugList[i].tradeName,
        //         tradeName: data.drugList[i].tradeName,
        //         form: data.drugList[i].form,
        //         specification: data.drugList[i].specification,
        //         isOTC: data.drugList[i].isOTC,
        //         otctype: data.drugList[i].otctype,
        //         manufacturer: data.drugList[i].manufacturer,
        //         manufacturerNameEng: data.drugList[i].manufacturerNameEng,
        //       };
        //       let isExist = false;
        //       for (let j = 0; j < resultList.length; j++) {
        //         if (resultList[j].name === data.drugList[i].productName) {
        //           isExist = true;
        //           resultList[j].productList.push(tempObj);
        //         }
        //       }
        //       if (!isExist) {
        //         resultList.push({
        //           name: data.drugList[i].productName,
        //           productList: [tempObj],
        //         });
        //       }
        //     }
        //     callback({ drugList: resultList });
        //   } else {
        //     callback(data);
        //   }
        // });

        return request(`/getItemsByDrugType`, {
            method: 'post',
            body: JSON.stringify(this._createRequestBody(body)),
            headers: this._header,
        }).then((data) => {
            if (type === 'healthcareMedicineType' || (type === 'chineseMedicineType' && data.drugList) || (type === 'westernMedicineType' && data.drugList)) {
                //根据药品名聚合
                let resultList = [];
                for (let i = 0; i < data.drugList.length; i++) {
                    let tempObj = {
                        id: data.drugList[i].id,
                        name: data.drugList[i].tradeName,
                        tradeName: data.drugList[i].tradeName,
                        form: data.drugList[i].form,
                        specification: data.drugList[i].specification,
                        isOTC: data.drugList[i].isOTC,
                        otctype: data.drugList[i].otctype,
                        manufacturer: data.drugList[i].manufacturer,
                        manufacturerNameEng: data.drugList[i].manufacturerNameEng,
                        classification: data.drugList[i].classification,
                    };
                    let isExist = false;
                    for (let j = 0; j < resultList.length; j++) {
                        if (resultList[j].name === data.drugList[i].productName) {
                            isExist = true;
                            resultList[j].productList.push(tempObj);
                        }
                    }
                    if (!isExist) {
                        resultList.push({
                            name: data.drugList[i].productName,
                            productList: [tempObj],
                        });
                    }
                }
                callback({ ...data, drugList: resultList });
            } else {
                callback(data);
            }
        });
    }

    //@TODO 获取用户查询记录
    static getInteractionHistory(callback) {

        // requestWithQueue(`/getInteractionHistory`, {
        //   method: 'post',
        //   body: JSON.stringify(this._createRequestBody()),
        //   headers: this._header,
        // }, callback);

        request(`/getInteractionHistory`, {
            method: 'post',
            body: JSON.stringify(this._createRequestBody()),
            headers: this._header,
        }).then((data) => {
            callback(data);
        });
    }

    //@TODO 通过关键字查询药品/成分名
    static getDrugNameListByKeyWord(keyWord, callback) {
        const body = {
            keyword: keyWord,
        };

        // requestWithQueue(`/getDrugNameListByKeyword`, {
        //   method: 'post',
        //   body: JSON.stringify(this._createRequestBody(body)),
        //   headers: this._header,
        // }, callback);

        request(`/getDrugNameListByKeyword`, {
            method: 'post',
            body: JSON.stringify(this._createRequestBody(body)),
            headers: this._header,
        }).then((data) => {
            callback(data);
        });
    }

    //@TODO 通过单个药品/成分查询与之有相互作用的药品/成分的列表
    static getInteractionDrugList(drug, page, callback) {
        const body = {
            drug: drug,
            pageNum: page,
            pageSize: this.getPageSizeByWindowHeight(),
        };

        // requestWithQueue(`/getInteractionDrugList`, {
        //   method: 'post',
        //   body: JSON.stringify(this._createRequestBody(body)),
        //   headers: this._header,
        // }, callback);

        request(`/getInteractionDrugList`, {
            method: 'post',
            body: JSON.stringify(this._createRequestBody(body)),
            headers: this._header,
        }).then((data) => {
            callback(data);
        });
    }

    //@TODO 查询2个药品/成分之间的相互作用
    static getDrugInteraction(drug1, drug2, callback) {
        const body = {
            drug1: drug1,
            drug2: drug2,
        };

        // requestWithQueue(`/getDrugInteraction`, {
        //   method: 'post',
        //   body: JSON.stringify(this._createRequestBody(body)),
        //   headers: this._header,
        // }, callback);

        request(`/getDrugInteraction`, {
            method: 'post',
            body: JSON.stringify(this._createRequestBody(body)),
            headers: this._header,
        }).then((data) => {
            callback(data);
        });
    }

    //@TODO 获取用户搜索记录
    static getSearchingHistory(callback) {

        // requestWithQueue(`/getSearchingHistory`, {
        //   method: 'post',
        //   body: JSON.stringify(this._createRequestBody()),
        //   headers: this._header,
        // }, callback);

        request(`/getSearchingHistory`, {
            method: 'post',
            body: JSON.stringify(this._createRequestBody()),
            headers: this._header,
        }).then((data) => {
            callback(data);
        });
    }

    //@TODO 智能搜索
    static intelligentSearching(content, callback) {
        const body = {
            content: content,
        };

        // requestWithQueue(`/intelligentSearching`, {
        //   method: 'post',
        //   body: JSON.stringify(this._createRequestBody(body)),
        //   headers: this._header,
        // }, (data) => {
        //   if (data.drugList && data.drugList.length > 0) {
        //     let resultList = [];
        //     for (let i = 0; i < data.drugList.length; i++) {
        //       let tempObj = {
        //         id: data.drugList[i].id,
        //         name: data.drugList[i].tradeName,
        //         tradeName: data.drugList[i].tradeName,
        //         form: data.drugList[i].form,
        //         specification: data.drugList[i].specification,
        //         isOTC: data.drugList[i].isOTC,
        //         otctype: data.drugList[i].otctype,
        //         manufacturer: data.drugList[i].manufacturer,
        //         manufacturerNameEng: data.drugList[i].manufacturerNameEng,
        //       };
        //       let isExist = false;
        //       for (let j = 0; j < resultList.length; j++) {
        //         if (resultList[j].name === data.drugList[i].productName) {
        //           isExist = true;
        //           resultList[j].productList.push(tempObj);
        //         }
        //       }
        //       if (!isExist) {
        //         resultList.push({
        //           name: data.drugList[i].productName,
        //           productList: [tempObj],
        //         });
        //       }
        //     }
        //     data.drugList = resultList;
        //   }
        //   callback(data);
        // });


        request(`/intelligentSearching`, {
            method: 'post',
            body: JSON.stringify(this._createRequestBody(body)),
            headers: this._header,
        }).then((data) => {

            if (data.drugList && data.drugList.length > 0) {
                let resultList = [];
                for (let i = 0; i < data.drugList.length; i++) {
                    let tempObj = {
                        id: data.drugList[i].id,
                        name: data.drugList[i].tradeName,
                        tradeName: data.drugList[i].tradeName,
                        form: data.drugList[i].form,
                        specification: data.drugList[i].specification,
                        isOTC: data.drugList[i].isOTC,
                        otctype: data.drugList[i].otctype,
                        manufacturer: data.drugList[i].manufacturer,
                        manufacturerNameEng: data.drugList[i].manufacturerNameEng,
                        classification: data.drugList[i].classification,
                        insuranceClassification: data.drugList[i].insuranceClassification,
                        type: 'card'
                    };
                    let isExist = false;
                    for (let j = 0; j < resultList.length; j++) {
                        if (resultList[j].name === data.drugList[i].productName) {
                            isExist = true;
                            resultList[j].productList.push(tempObj);
                        }
                    }
                    if (!isExist) {
                        resultList.push({
                            name: data.drugList[i].productName,
                            productList: [tempObj],
                        });
                    }
                }
                data.drugList = resultList;
            }
            callback(data);
        });
    }

    //@TODO 智能推荐药品
    static intelligentDrugRecommend(confirmedIndicationList, needMoreRelatedIndication, age, sex, group, callback) {
        const body = {
            confirmedIndicationList: confirmedIndicationList,
            needMoreRelatedIndication: needMoreRelatedIndication,
            age: age,
            sex: sex,
            group: group,
        };

        // requestWithQueue(`/intelligentDrugRecommend`, {
        //   method: 'post',
        //   body: JSON.stringify(this._createRequestBody(body)),
        //   headers: this._header,
        // }, callback);

        request(`/intelligentDrugRecommend`, {
            method: 'post',
            body: JSON.stringify(this._createRequestBody(body)),
            headers: this._header,
        }).then((data) => {
            callback(data);
        });
    }

    //@TODO 首页获取用户输入最多10个问题
    static getPopularQuestiones(user_id, callback) {
        const body = {
            user_id: String.valueOf(user_id),
        };

        // requestWithQueue(`/getPopularQuestiones`, {
        //   method: 'post',
        //   body: JSON.stringify(this._createRequestBody(body)),
        //   headers: this._header,
        // }, callback);

        request(`/getPopularQuestiones`, {
            method: 'post',
            body: JSON.stringify(this._createRequestBody(body)),
            headers: this._header,
        }).then((data) => {
            callback(data);
        });
    }

    //@TODO 获取疾病分类
    static getDiseaseCatalogList(currName = '', callback) {
        let body = {};
        if (currName !== '') {
            body = {
                currName: currName,
            };
        }

        // requestWithQueue(`/getDiseaseCatalogList`, {
        //   method: 'post',
        //   body: JSON.stringify(this._createRequestBody(body)),
        //   headers: this._header,
        // }, callback);

        request(`/getDiseaseCatalogList`, {
            method: 'post',
            body: JSON.stringify(this._createRequestBody(body)),
            headers: this._header,
        }).then((data) => {
            callback(data);
        });
    }

    //@TODO 获取app全局配置
    static getGlobalConfig(callback) {

        // requestWithQueue(`/getGlobalConfig`, {
        //   method: 'post',
        //   body: JSON.stringify(this._createRequestBody({})),
        //   headers: this._header,
        // }, callback);

        request(`/getGlobalConfig`, {
            method: 'post',
            body: JSON.stringify(this._createRequestBody({})),
            headers: this._header,
        }).then((data) => {
            callback(data);
        });
    }

    //@TODO 更新用户引导信息
    static completeGuidence(module = '', callback) {

        // requestWithQueue(`/completeGuidence`, {
        //   method: 'post',
        //   body: JSON.stringify(this._createRequestBody({})),
        //   headers: this._header,
        // }, callback);
        const body = {
            module: module,
        };
        request(`/completeGuidence`, {
            method: 'post',
            body: JSON.stringify(this._createRequestBody(body)),
            headers: this._header,
        }).then((data) => {
            callback(data);
        });
    }

    //@TODO 查询用药指导搜索记录
    static getMedication_guidance_history(callback) {

        // requestWithQueue(`/completeGuidence`, {
        //   method: 'post',
        //   body: JSON.stringify(this._createRequestBody({})),
        //   headers: this._header,
        // }, callback);
        const body = {};
        request(`/getMedication_guidance_history`, {
            method: 'post',
            body: JSON.stringify(this._createRequestBody(body)),
            headers: this._header,
        }).then((data) => {
            callback(data);
        });
    }

    //@TODO 删除单条用户用药检查搜索记录
    static delMedication_guidance_history(searchText, callback) {

        // requestWithQueue(`/completeGuidence`, {
        //   method: 'post',
        //   body: JSON.stringify(this._createRequestBody({})),
        //   headers: this._header,
        // }, callback);
        const body = {
            searchText: searchText,
        };
        request(`/delMedication_guidance_history`, {
            method: 'post',
            body: JSON.stringify(this._createRequestBody(body)),
            headers: this._header,
        }).then((data) => {
            callback(data);
        });
    }

    //@TODO 清空用户用药检查搜索记录
    static clearMedication_guidance_history(callback) {

        // requestWithQueue(`/completeGuidence`, {
        //   method: 'post',
        //   body: JSON.stringify(this._createRequestBody({})),
        //   headers: this._header,
        // }, callback);
        const body = {};
        request(`/clearMedication_guidance_history`, {
            method: 'post',
            body: JSON.stringify(this._createRequestBody(body)),
            headers: this._header,
        }).then((data) => {
            callback(data);
        });
    }

    //@TODO 药品禁忌查询
    static getDrugTaboo(drugIdList, userInfo, callback) {

        // requestWithQueue(`/completeGuidence`, {
        //   method: 'post',
        //   body: JSON.stringify(this._createRequestBody({})),
        //   headers: this._header,
        // }, callback);
        const body = {
            drugIdList: drugIdList,
            ...userInfo,
        };
        request(`/getDrugTaboo`, {
            method: 'post',
            body: JSON.stringify(this._createRequestBody(body)),
            headers: this._header,
        }).then((data) => {
            callback(data);
        });
    }

    //@TODO 药品禁忌查询
    static checkDrugInteraction(drugIdList, callback) {

        // requestWithQueue(`/completeGuidence`, {
        //   method: 'post',
        //   body: JSON.stringify(this._createRequestBody({})),
        //   headers: this._header,
        // }, callback);
        const body = {
            drugIdList: drugIdList,
        };
        request(`/checkDrugInteraction`, {
            method: 'post',
            body: JSON.stringify(this._createRequestBody(body)),
            headers: this._header,
        }).then((data) => {
            let yanZhong = [];
            let zhongDu = [];
            let qingDu = [];
            let unknown = [];
            for (let i = 0; i < data.interactionList.length; i++) {
                if (data.interactionList[i].severitylevel === Global.INTERACTION_TYPE_MAJOR) {
                    yanZhong.push(data.interactionList[i]);
                } else if (data.interactionList[i].severitylevel === Global.INTERACTION_TYPE_MODERATE) {
                    zhongDu.push(data.interactionList[i]);
                } else if (data.interactionList[i].severitylevel === Global.INTERACTION_TYPE_MAJOR) {
                    qingDu.push(data.interactionList[i]);
                } else {
                    unknown.push(data.interactionList[i]);
                }
            }
            callback({ 'interactionList': yanZhong.concat(zhongDu).concat(qingDu).concat(unknown) });
        });
    }

    //@TODO 批量查询药品信息
    static getDrugDetailByIdListForMedicationGuidance(drugIdList, userInfo, callback) {

        // requestWithQueue(`/completeGuidence`, {
        //   method: 'post',
        //   body: JSON.stringify(this._createRequestBody({})),
        //   headers: this._header,
        // }, callback);
        const body = {
            drugIdList: drugIdList,
            ...userInfo,
        };
        request(`/getDrugDetailByIdListForMedicationGuidance`, {
            method: 'post',
            body: JSON.stringify(this._createRequestBody(body)),
            headers: this._header,
        }).then((data) => {
            callback(data);
        });
    }

    //@TODO 用药指导智能搜索
    static getMedicationGuidance(content, callback) {

        // requestWithQueue(`/completeGuidence`, {
        //   method: 'post',
        //   body: JSON.stringify(this._createRequestBody({})),
        //   headers: this._header,
        // }, callback);
        const body = {
            content: content,
        };
        request(`/getMedicationGuidance`, {
            method: 'post',
            body: JSON.stringify(this._createRequestBody(body)),
            headers: this._header,
        }).then((data) => {

            if (data.drugList && data.drugList.length > 0) {
                let resultList = [];
                for (let i = 0; i < data.drugList.length; i++) {
                    let tempObj = {
                        id: data.drugList[i].id,
                        name: data.drugList[i].tradeName,
                        tradeName: data.drugList[i].tradeName,
                        productName: data.drugList[i].productName,
                        form: data.drugList[i].form,
                        specification: data.drugList[i].specification,
                        isOTC: data.drugList[i].isOTC,
                        otctype: data.drugList[i].otctype,
                        manufacturer: data.drugList[i].manufacturer,
                        manufacturerNameEng: data.drugList[i].manufacturerNameEng,
                        classification: data.drugList[i].classification,
                        insuranceClassification: data.drugList[i].insuranceClassification,
                        indication: data.drugList[i].indication,
                    };
                    let isExist = false;
                    for (let j = 0; j < resultList.length; j++) {
                        if (resultList[j].name === data.drugList[i].productName) {
                            isExist = true;
                            resultList[j].productList.push(tempObj);
                        }
                    }
                    if (!isExist) {
                        resultList.push({
                            name: data.drugList[i].productName,
                            productList: [tempObj],
                        });
                    }
                }
                data.drugList = resultList;
            }

            //fuck yuyang
            if (data.catalogForChineseMedicine && data.catalogForChineseMedicine.length > 0) {
                for (let i = 0; i < data.catalogForChineseMedicine.length; i++) {
                    for (let j = 0; j < data.catalogForChineseMedicine[i].drugList.length; j++) {
                        data.catalogForChineseMedicine[i].drugList[j].name = data.catalogForChineseMedicine[i].drugList[j].productName;
                    }
                    data.catalogForChineseMedicine[i].productList = data.catalogForChineseMedicine[i].drugList;
                }
                data.drugList = (data.drugList && data.drugList.length > 0) ? data.drugList.concat(data.catalogForChineseMedicine) : data.catalogForChineseMedicine;
            }

            //fuck yuyang all home
            if (data.catalogForPharmaceutical && data.catalogForPharmaceutical.length > 0) {
                let formListTemp = [];
                for (let i = 0; i < data.catalogForPharmaceutical.length; i++) {
                    formListTemp = formListTemp.concat(data.catalogForPharmaceutical[i].pharmaceuticalList);
                }
                data.pharmaceuticalList = (data.pharmaceuticalList && data.pharmaceuticalList.length > 0) ? data.pharmaceuticalList.concat(formListTemp) : formListTemp;
            }

            callback(data);
        });
    }

    //  add 辅助诊断相关
    static getZhusuList(zhusuStr, sex = '男', callback) {
        let body = {
            action: 'inquiry',
            data: zhusuStr,
            sex: sex,
        };
        request(`/inquiry`, {
            method: 'post',
            body: JSON.stringify(this._createRequestBody(body, Global.HTTP_REQUEST_TO_INQUIRY)),
            headers: this._header,
        }, Global.HTTP_REQUEST_TO_INQUIRY).then((data) => {
            callback(data);
        });
    }

    static getNextZhusuList(confirmed_C, unConfirmed_C, callback) {
        let body = {
            confirmed_C: confirmed_C,
            unConfirmed_C: unConfirmed_C,
        };
        request(`/inquiry`, {
            method: 'post',
            body: JSON.stringify(this._createRequestBody(body, Global.HTTP_REQUEST_TO_INQUIRY)),
            headers: this._header,
        }, Global.HTTP_REQUEST_TO_INQUIRY).then((data) => {
            callback(data);
        });
    }

    static getFuZhuJianChaList(confirmedSignList, unconfirmedSignList, callback) {
        let body = {
            confirmedSignList: confirmedSignList,
            unconfirmedSignList: unconfirmedSignList,
        };
        request(`/inquiry`, {
            method: 'post',
            body: JSON.stringify(this._createRequestBody(body, Global.HTTP_REQUEST_TO_INQUIRY)),
            headers: this._header,
        }, Global.HTTP_REQUEST_TO_INQUIRY).then((data) => {
            callback(data);
        });
    }

    static getDiseaseNameList(confirmedExaminationList, deniedExaminationList, callback) {
        let body = {
            confirmedExaminationList: confirmedExaminationList,
            deniedExaminationList: deniedExaminationList,
        };
        request(`/inquiry`, {
            method: 'post',
            body: JSON.stringify(this._createRequestBody(body, Global.HTTP_REQUEST_TO_INQUIRY)),
            headers: this._header,
        }, Global.HTTP_REQUEST_TO_INQUIRY).then((data) => {
            callback(data);
        });
    }


    static phoneLogin(phone, yzcoe, callback) {
        let body = {
            action: 'verify',
            verifyCode: yzcoe,
            phoneNum: phone,
        };
        request(`/phoneLogin`, {
            method: 'post',
            body: JSON.stringify(this._createRequestBody(body, Global.HTTP_REQUEST_TO_INQUIRY)),
            headers: this._header,
        }, Global.HTTP_REQUEST_TO_INQUIRY).then((data) => {
            if (data.state !== 'success') {
                callback(null);
            } else {
                sessionStorage.setItem('hasPermission', data.atlasPermission ? 'true' : 'false');
                sessionStorage.setItem('user', phone);
                callback(data);
            }
        });
    }

    static getYZCode(phone, callback) {
        let body = {
            action: 'getVerificationCode',
            phoneNum: phone,
        };
        request(`/phoneLogin`, {
            method: 'post',
            body: JSON.stringify(this._createRequestBody(body, Global.HTTP_REQUEST_TO_INQUIRY)),
            headers: this._header,
        }, Global.HTTP_REQUEST_TO_INQUIRY).then((data) => {
            if (data.state !== 'success') {
                callback(null);
            } else {
                callback(data);
            }
        });
    }

    static getHealthcareDrugIndexList(callback) {
        let body = {};
        request(`/drug/queryHealthcareIndexList`, {
            method: 'post',
            body: JSON.stringify(this._createRequestBody(body, Global.HTTP_REQUEST_TO_LOCAL)),
            headers: this._header,
        }, Global.HTTP_REQUEST_TO_LOCAL).then((data) => {
            callback(data);
        });
    }

    static getDiseaseIndexList(callback) {
        let body = {};
        request(`/disease/queryAllOrderByDepartment`, {
            method: 'post',
            body: JSON.stringify(this._createRequestBody(body, Global.HTTP_REQUEST_TO_LOCAL)),
            headers: this._header,
        }, Global.HTTP_REQUEST_TO_LOCAL).then((data) => {
            callback(data);
        });
    }

    static queryChartByDrugId(id, callback) {
        let body = {
            drugId: id,
        };
        request(`/disease/queryChartById`, {
            method: 'post',
            body: JSON.stringify(this._createRequestBody(body, Global.HTTP_REQUEST_TO_LOCAL)),
            headers: this._header,
        }, Global.HTTP_REQUEST_TO_LOCAL).then((data) => {
            callback(data);
        });
    }

    static queryChartByDiseaseId(id, callback) {
        let body = {
            diseaseId: id,
        };
        request(`/disease/queryChartById`, {
            method: 'post',
            body: JSON.stringify(this._createRequestBody(body, Global.HTTP_REQUEST_TO_LOCAL)),
            headers: this._header,
        }, Global.HTTP_REQUEST_TO_LOCAL).then((data) => {
            callback(data);
        });
    }
}