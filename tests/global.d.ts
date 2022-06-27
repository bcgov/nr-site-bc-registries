declare global {
    const downloadDir: string;
    namespace NodeJS {
        interface Global {
            downloadDir: typeof string;
        }
    }
}
export default global;
