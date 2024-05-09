const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../errors/app-error");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadDir;

    if (req.path === "/profile-picture") {
      if (file.mimetype.startsWith("image")) {
        uploadDir = `uploads/users/${req.user.id}/profile-picture`;
      } else {
        return cb(
          new AppError(
            "File type not supported. Only images are allowed.",
            { explanation: "" },
            StatusCodes.BAD_REQUEST
          )
        );
      }
    }

    if (req.path === "/resume-upload") {
      if (
        file.mimetype === "application/pdf" ||
        file.mimetype === "application/msword" ||
        file.mimetype ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        uploadDir = `uploads/users/${req.user.id}/resume`;
      } else {
        return cb(
          new AppError(
            "File type not supported. Only Pdfs and docs are allowed.",
            { explanation: "" },
            StatusCodes.BAD_REQUEST
          )
        );
      }
    }

    if (req.path === "/video-upload") {
      if (file.mimetype.startsWith("video")) {
        uploadDir = `uploads/users/${req.user.id}/video`;
      } else {
        return cb(
          new AppError(
            "File type not supported. Only Videos are allowed.",
            { explanation: "" },
            StatusCodes.BAD_REQUEST
          )
        );
      }
    }

    // Create user directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const size = +req.rawHeaders.slice(-1)[0];

  if (req.path === "/profile-picture") {
    if (file.mimetype.startsWith("image")) {
      // Check video count
      const uploadDir = `uploads/users/${req.user.id}/profile-picture`;
      if (fs.existsSync(uploadDir)) {
        fs.readdir(uploadDir, (error, files) => {
          if (error) {
            return cb(
              new AppError(
                "Error reading folder.",
                { explanation: error.message },
                StatusCodes.BAD_REQUEST
              )
            );
          }

          // Remove each file in the folder
          files.forEach((file) => {
            const filePath = path.join(uploadDir, file);
            fs.unlink(filePath, (error) => {
              if (error) {
                return cb(
                  new AppError(
                    "Error Deleting file.",
                    { explanation: error.message },
                    StatusCodes.BAD_REQUEST
                  )
                );
              }
            });
          });
        });

        if (size > 3 * 1024 * 1024) {
          return cb(
            new AppError(
              "File size exceeds the limit of 3MB",
              { explanation: "" },
              StatusCodes.BAD_REQUEST
            )
          );
        }
      }
      cb(null, true);
    } else {
      return cb(
        new AppError(
          "File type not supported. Only images are allowed.",
          { explanation: "" },
          StatusCodes.BAD_REQUEST
        )
      );
    }
  }

  if (req.path === "/resume-upload") {
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype === "application/msword" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      // Check PDF count
      const uploadDir = `uploads/users/${req.user.id}/resume`;
      if (fs.existsSync(uploadDir)) {
        const pdfFiles = fs
          .readdirSync(uploadDir)
          .filter(
            (file) =>
              file.endsWith(".pdf") ||
              file.endsWith(".docx") ||
              file.endsWith(".doc")
          );
        if (pdfFiles.length >= 3) {
          return cb(
            new AppError(
              "Only 3 resume files are allowed per user",
              { explanation: "" },
              StatusCodes.BAD_REQUEST
            )
          );
        }
        if (size > 3 * 1024 * 1024) {
          return cb(
            new AppError(
              "File size exceeds the limit of 3MB",
              { explanation: "" },
              StatusCodes.BAD_REQUEST
            )
          );
        }
      }
      cb(null, true);
    } else {
      return cb(
        new AppError(
          "File type not supported. Only pdfs and docs are allowed.",
          { explanation: "" },
          StatusCodes.BAD_REQUEST
        )
      );
    }
  }

  if (req.path === "/video-upload") {
    if (file.mimetype.startsWith("video")) {
      // Check video count
      const uploadDir = `uploads/users/${req.user.id}/video`;
      if (fs.existsSync(uploadDir)) {
        const videoFiles = fs
          .readdirSync(uploadDir)
          .filter(
            (file) =>
              file.endsWith(".mp4") ||
              file.endsWith(".mov") ||
              file.endsWith(".avi") ||
              file.endsWith(".mkv") ||
              file.endsWith(".wmv") ||
              file.endsWith(".avchd") ||
              file.endsWith(".webm")
          );
        if (videoFiles.length >= 5) {
          return cb(
            new AppError(
              "Only 5 video files are allowed per user",
              { explanation: "" },
              StatusCodes.BAD_REQUEST
            )
          );
        }
        if (size > 50 * 1024 * 1024) {
          return cb(
            new AppError(
              "File size exceeds the limit of 50MB",
              { explanation: "" },
              StatusCodes.BAD_REQUEST
            )
          );
        }
      }
      cb(null, true);
    } else {
      return cb(
        new AppError(
          "File type not supported. Only videos are allowed.",
          { explanation: "" },
          StatusCodes.BAD_REQUEST
        )
      );
    }
  }
};

// Init upload
const upload = multer({
  limits: 500000,
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
