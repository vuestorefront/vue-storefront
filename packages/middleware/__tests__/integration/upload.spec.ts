import { Server } from "http";
import request from "supertest";
import { createServer } from "../../src/index";

describe("[Integration] Create server", () => {
  let app: Server;

  const getServer = async (isUploadEnabled: boolean = true) => {
    return await createServer(
      {
        integrations: {
          test_integration: {
            location: "./__tests__/integration/bootstrap/serverWithUpload",
            configuration: {},
          },
        },
      },
      {
        fileUpload: {
          enabled: isUploadEnabled,
        },
      }
    );
  };

  it("should allow to upload files if fileUpload is enabled", async () => {
    app = await getServer();

    const { status, body } = await request(app)
      .post("/test_integration/upload")
      .set("Content-Type", "multipart/form-data")
      .attach("files", Buffer.from("test file content"), "test.jpg")
      .expect(200);

    expect(status).toBe(200);
    expect(body).toBeDefined();
    expect(body.files).toEqual([
      {
        fieldname: "files",
        originalname: "test.jpg",
        encoding: "7bit",
        mimetype: "image/jpeg",
        buffer: expect.any(Object),
        size: 17,
      },
    ]);
  });

  it("should not allow to upload files if fileUpload is disabled", async () => {
    app = await getServer(false);

    const { status, body } = await request(app)
      .post("/test_integration/upload")
      .set("Content-Type", "multipart/form-data")
      .expect(200);

    expect(status).toBe(200);
    expect(body).toBeDefined();
    expect(body.files).toBeUndefined();
  });

  it("should allow sending non multipart/form-data requests when fileUpload is enabled", async () => {
    app = await getServer();

    const { body } = await request(app)
      .post("/test_integration/upload")
      .expect(200);

    expect(body).toBeDefined();
    expect(body.files).toBeUndefined();
    expect(body.message).toBe("ok");
  });

  // add test for options provided from the request
  it("should allow to provide options from the request", async () => {
    app = await createServer(
      {
        integrations: {
          test_integration: {
            location: "./__tests__/integration/bootstrap/serverWithUpload",
            configuration: {},
          },
        },
      },
      {
        fileUpload: (req) => ({
          enabled: req.headers["x-enable-upload"] === "true",
        }),
      }
    );

    // Test with uploads enabled via header
    const uploadEnabled = await request(app)
      .post("/test_integration/upload")
      .set("Content-Type", "multipart/form-data")
      .set("x-enable-upload", "true")
      .attach("files", Buffer.from("test file content"), "test.jpg")
      .expect(200);

    expect(uploadEnabled.body.files).toEqual([
      {
        fieldname: "files",
        originalname: "test.jpg",
        encoding: "7bit",
        mimetype: "image/jpeg",
        buffer: expect.any(Object),
        size: 17,
      },
    ]);

    // Test with uploads disabled via header
    const uploadDisabled = await request(app)
      .post("/test_integration/upload")
      .set("Content-Type", "multipart/form-data")
      .set("x-enable-upload", "false")
      .attach("files", Buffer.from("test file content"), "test.jpg")
      .expect(200);

    expect(uploadDisabled.body.files).toBeUndefined();
  });
});
