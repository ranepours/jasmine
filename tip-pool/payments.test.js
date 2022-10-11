describe("Payments tests", () => {
    beforeEach(() => {
        billAmtInput.value = 100;
        tipAmtInput.value = 20;
    });

    it("should add new payment on submit", () => {
        submitPaymentInfo();

        expect(Object.keys(allPayments).length).toEqual(1);
        expect(allPayments['payment1'].billAmt).toEqual('100');
        expect(allPayments['payment1'].tipAmt).toEqual('20');
        expect(allPayments['payment1'].tipPercent).toEqual(20);
    });

    it("should handle add new payment if empty on submit", () => {
        billAmtInput.value = '';
        submitPaymentInfo();

        expect(Object.keys(allPayments).length).toEqual(0);
    })

    it("should update paymentTable on append", () => {
        let curPayment = createCurPayment();
        allPayments['payment1'] = curPayment;

        appendPaymentTable(curPayment);

        let curTdList = document.querySelectorAll('#paymentTable tbody tr td');

        expect(curTdList.length).toEqual(4);
        expect(curTdList[0].innerText).toEqual('$100');
        expect(curTdList[1].innerText).toEqual('$20');
        expect(curTdList[2].innerText).toEqual('%20');
        expect(curTdList[3].innerText).toEqual('X');
    });

    it("should create new payment on create", () => {
        let expectedPayment = {
            billAmt: '100',
            tipAmt: '20',
            tipPercent: 20,
        }
  
        expect(createCurPayment()).toEqual(expectedPayment);
    });

    it("should handle empty create payment", () => {
        billAmtInput.value = '';
        tipAmtInput.value = '';
        let curPayment = createCurPayment();

        expect(curPayment).toEqual(undefined);
    })

    afterEach(() => {
        billAmtInput.value = '';
        tipAmtInput.value = '';
        paymentTbody.innerHTML = '';
        summaryTds[0].innerHTML = '';
        summaryTds[1].innerHTML = '';
        summaryTds[2].innerHTML = '';
        serverTbody.innerHTML = '';
        paymentId = 0;
        allPayments = {}; 
    });
})