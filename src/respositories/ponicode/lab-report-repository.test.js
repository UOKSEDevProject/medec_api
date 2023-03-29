const lab_report_repository = require("../lab-report-repository")
// @ponicode
describe("lab_report_repository.updateLabReportStatusOnCompletion", () => {
    test("0", async () => {
        await lab_report_repository.updateLabReportStatusOnCompletion("641ff7bb6c02a7aebd4cc1d6", "https://medec-content.s3.ap-south-1.amazonaws.com/logo512.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAWZ5URD3XFM7RNTB2%2F20230329%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230329T093921Z&X-Amz-Expires=10000&X-Amz-Signature=588ce1d0afe867d8083bd30474da853b8f3d7b923dcdbc5e08fe1f453e0fc6bd&X-Amz-SignedHeaders=host")
    })
})
