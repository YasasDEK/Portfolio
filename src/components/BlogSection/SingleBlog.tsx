import {
  Box,
  Stack,
  Typography,
  Divider,
  IconButton,
  Tooltip,
  TextField,
  FormLabel,
  Button,
  Alert,
} from "@mui/material";
import { getDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { RefObject, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { database } from "../../config/firebase";
import SingleBlogPageSkeleton from "./SingleBlogPageSkeleton";
import MessageIcon from "@mui/icons-material/Message";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CircularProgress from "@mui/material/CircularProgress";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import CommentsDrawer from "./CommentsDrawer";

interface Blog {
  blog: {
    subHeading: string;
    paragraph: string[];
  }[];
  blogDate: string;
  description: string;
  heading: string;
  readTime: string;
  shortDescription: string;
  tags: string[];
  coverImage: string;
}

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "required" })
    .max(50, { message: "large" }),
  email: z
    .string()
    .min(1, { message: "required" })
    .max(260, { message: "large" })
    .email({ message: "invalid" }),
  comment: z
    .string()
    .min(1, { message: "required" })
    .max(500, { message: "large" }),
});

type FormSchema = z.infer<typeof formSchema>;

const formDefaultValue = {
  name: "",
  email: "",
  comment: "",
};

const SingleBlog = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const blogId = queryParams.get("blogId");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccessful, setSubmitSuccessful] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [blogDetails, setBlogDetails] = useState<Blog | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { handleSubmit, control, reset, formState, getValues } =
    useForm<FormSchema>({
      resolver: zodResolver(formSchema),
      mode: "onChange",
      defaultValues: formDefaultValue,
    });

  const textFieldStyles = {
    mt: 0.5,
    background: "white",
    borderRadius: 2,
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#fe6c0a",
        opacity: 0.75,
        borderRadius: 2,
      },
      "&.Mui-focused fieldset": {
        borderColor: "#fe6c0a",
        borderRadius: 2,
        opacity: 0.75,
      },
    },
  };

  const resetAlerts = () => {
    setSubmitSuccessful(false);
    setErrorSubmit(false);
  };

  const onSubmit = async () => {
    resetAlerts();

    if (blogId) {
      setSubmitting(true);
      try {
        const documentRef = doc(database, "blogPosts", blogId);

        await updateDoc(documentRef, {
          comments: arrayUnion(getValues()),
        });

        setSubmitSuccessful(true);

        reset();

        setTimeout(resetAlerts, 3000);
      } catch (error) {
        setErrorSubmit(true);
      }
    }

    setSubmitting(false);
  };

  const getError = () => {
    if (
      formState.errors.name?.message === "required" ||
      formState.errors.email?.message === "required" ||
      formState.errors.comment?.message === "required"
    ) {
      return (
        <Alert severity="error">
          Please fill all the fileds to add a comment
        </Alert>
      );
    }

    if (
      formState.errors.email?.message === "invalid" ||
      formState.errors.email?.message === "large"
    ) {
      return <Alert severity="error">Invalid Email</Alert>;
    }

    if (formState.errors.name?.message === "large") {
      return (
        <Alert severity="error">
          Name should contain less than 30 characters
        </Alert>
      );
    } else if (formState.errors.comment?.message === "large") {
      return (
        <Alert severity="error">
          comment should contain less than 500 characters
        </Alert>
      );
    }

    return "";
  };

  const scrollBottom = (event: RefObject<HTMLDivElement>) => {
    event?.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleDrawerClose = () => {
    setCommentsOpen(false);
  };

  const getText = (para: string) => {
    if (para.includes("<code>")) {
      const sandBoxUrl = para.replace(/<\/?code>/g, "");

      return (
        <iframe
          src={sandBoxUrl}
          style={{
            width: "100%",
            height: "500px",
            border: 0,
            borderRadius: 4,
            overflow: "hidden",
          }}
          title={blogDetails?.heading}
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        />
      );
    } else {
      return <Typography>{para}</Typography>;
    }
  };

  const headingSection = (
    <Box
      sx={{
        mt: 2,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: { xs: "center", md: "space-between" },
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          color: "white",
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 40,
          textAlign: { xs: "center", md: "start" },
        }}
      >
        {blogDetails?.heading}
      </Typography>

      <Box
        sx={{
          p: 0,
          m: 0,
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: 14,
            justifyItem: "end",
            mb: { xs: 2, md: 0 },
          }}
        >
          📆{blogDetails?.blogDate}
        </Typography>

        <Typography
          sx={{
            color: "white",
            fontSize: 14,
            display: "flex",
            justifyContent: { xs: "start", md: "end" },
          }}
        >
          ⏳{blogDetails?.readTime} read
        </Typography>
      </Box>
    </Box>
  );

  const iconButtonSection = (
    <Stack direction="row" alignItems="top" spacing={1}>
      <Tooltip title="Add a comment" placement="top" sx={{ p: 0 }}>
        <IconButton onClick={() => scrollBottom(scrollRef)}>
          <MessageIcon
            sx={{
              color: "white",
              "&:hover": {
                color: "#fe6c0a",
              },
            }}
          />
        </IconButton>
      </Tooltip>

      <Tooltip
        title="Read previous comments"
        placement="top"
        sx={{ p: 0, pb: 0.5 }}
      >
        <IconButton onClick={() => setCommentsOpen(true)}>
          <MarkEmailReadIcon
            sx={{
              color: "white",
              "&:hover": {
                color: "#fe6c0a",
              },
            }}
          />
        </IconButton>
      </Tooltip>
    </Stack>
  );

  const shortDescriptionSection = (
    <Box
      sx={{
        py: 2,
        gap: 4,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography sx={{ color: "white", fontSize: 18 }}>
          {blogDetails?.shortDescription}
        </Typography>

        <Box
          sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
        >
          {blogDetails?.tags.map((tag, index) => (
            <Typography
              key={index}
              sx={{ color: "#fe6c0a", fontSize: 14, pr: 0.5 }}
            >
              #{tag}
            </Typography>
          ))}
        </Box>
      </Box>

      {iconButtonSection}
    </Box>
  );

  const commentFormSection = (
    <Box ref={scrollRef}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography
          sx={{
            color: "rgba(0, 0, 0, 0.6)",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 18,
          }}
        >
          Name
        </Typography>

        <Controller
          name="name"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              fullWidth
              size="small"
              sx={textFieldStyles}
              value={value}
              onChange={onChange}
            />
          )}
        />

        <Typography
          sx={{
            mt: 2,
            color: "rgba(0, 0, 0, 0.6)",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 18,
          }}
        >
          Email
        </Typography>

        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              fullWidth
              size="small"
              sx={textFieldStyles}
              value={value}
              onChange={onChange}
            />
          )}
        />

        <Typography
          sx={{
            mt: 2,
            color: "rgba(0, 0, 0, 0.6)",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 18,
          }}
        >
          Comment
        </Typography>

        <Controller
          name="comment"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              multiline
              rows={4}
              type="email"
              fullWidth
              size="small"
              sx={textFieldStyles}
              onChange={onChange}
              value={value}
            />
          )}
        />

        <Box
          sx={{
            gap: 2,
            flexDirection: { xs: "column", lg: "row" },
            display: "flex",
            justifyContent: "end",
            mt: 2,
          }}
        >
          <Box>{getError()}</Box>

          {!getError() && submitSuccessful && (
            <Alert severity="success">Thank you for your comments!</Alert>
          )}

          {errorSubmit && (
            <Alert severity="success">
              An unexpected error occured! Please try again!
            </Alert>
          )}
          <Box>
            <Button
              variant="contained"
              type="submit"
              disabled={submitting}
              sx={{
                width: { xs: "100%", lg: 180 },
                backgroundColor: "#fe6c0a",
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 20,
                "&:hover": { background: "#fe6c0a", opacity: 0.8 },
                "&:disabled": {
                  backgroundColor: "#fe6c0a",
                  color: "white",
                  opacity: 0.5,
                },
              }}
            >
              Submit
              {submitting && (
                <CircularProgress sx={{ color: "white", ml: 1 }} size={20} />
              )}
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );

  const commentsHeaderSection = (
    <FormLabel
      sx={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 25,
      }}
    >
      💭💡What are your thoughts?
    </FormLabel>
  );

  const subsectionArea = (
    <Stack spacing={4} sx={{ mt: 2 }}>
      {blogDetails?.blog.map((data, index) => (
        <Box key={index}>
          <Typography
            sx={{
              color: "#fe6c0a",
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 24,
            }}
          >
            {data.subHeading}
          </Typography>

          {data.paragraph.map((para, subIndex) => (
            <Box
              key={subIndex}
              sx={{ color: "white", mt: subIndex === 0 ? 0 : 2 }}
            >
              {getText(para)}
            </Box>
          ))}
        </Box>
      ))}
    </Stack>
  );

  const singlePageContent = (
    <Box sx={{ width: "75vw", flexWrap: "wrap" }}>
      <Box
        sx={{
          width: "100%",
          height: 350,
          backgroundImage: `url(${blogDetails?.coverImage})`,
          backgroundColor: "white",
          backgroundPosition: "center",
          display: "flex",
          borderRadius: 2,
          justifyContent: "center",
          alignItems: "end",
        }}
      />
      <Box sx={{ px: { xs: 0, lg: 20 } }}>
        {headingSection}

        <Divider sx={{ backgroundColor: "#33393f" }} />

        {shortDescriptionSection}

        <Divider sx={{ backgroundColor: "#33393f" }} />

        <Typography sx={{ mt: 4, color: "white", fontSize: 16 }}>
          {blogDetails?.description}
        </Typography>

        {subsectionArea}

        <Box sx={{ pt: 8, px: { sm: 0, lg: 8 } }}>
          <Stack
            sx={{
              p: 4,
              backgroundColor: "#80868c",
              borderRadius: 2,
            }}
          >
            {commentsHeaderSection}

            {commentFormSection}
          </Stack>
        </Box>
      </Box>

      <CommentsDrawer
        open={commentsOpen}
        handleClose={handleDrawerClose}
        blogId={blogId!}
      />
    </Box>
  );

  useEffect(() => {
    setLoading(true);

    reset();

    const getBlogsPosts = async () => {
      if (blogId) {
        try {
          const documentRef = doc(database, "blogPosts", blogId);

          const documentSnapshot = await getDoc(documentRef);

          setBlogDetails({
            blog: documentSnapshot.data()?.blog,
            blogDate: documentSnapshot.data()?.blogDate,
            description: documentSnapshot.data()?.description,
            heading: documentSnapshot.data()?.heading,
            readTime: documentSnapshot.data()?.readTime,
            shortDescription: documentSnapshot.data()?.shortDescription,
            tags: documentSnapshot.data()?.tags,
            coverImage: documentSnapshot.data()?.coverImage,
          });

          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
    };

    getBlogsPosts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ pt: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {loading ? <SingleBlogPageSkeleton /> : singlePageContent}
      </Box>
    </Box>
  );
};

export default SingleBlog;
