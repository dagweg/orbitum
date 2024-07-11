import Attachments from "../controllers/attachments";
import connectDB from "../utils/db";

jest.setTimeout(20000);

describe("Attachments Unit Test", () => {
  let attachments = new Attachments();

  beforeAll(() => {
    connectDB();
  });

  beforeEach(() => {
    attachments = new Attachments();
  });

  test("Creating Empty Attachments", async () => {});

  test("Creating Valid Attachments", async () => {});
});
