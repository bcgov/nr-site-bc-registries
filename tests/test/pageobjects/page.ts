// page.ts
export default class Page {
    constructor() {}

    get hrcPageIdentifier() {
        return $('#hrcPageIdentifier');
    }

    get viewAggregatePlanLink() {
        return $('=View Aggregate Plan');
    }

    get viewPlanLink() {
        return $('=View Plan');
    }

    get endorsementLink() {
        return $('=Endorsement');
    }

    async open(path: string) {
        await browser.url(path);
    }
}
