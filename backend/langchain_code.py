# # langchain.py
# from langchain_community.document_loaders import PyPDFLoader
# from langchain_google_genai import ChatGoogleGenerativeAI
# from langchain_google_genai import GoogleGenerativeAIEmbeddings
# from langchain_community.vectorstores import Chroma
# from langchain.embeddings.openai import OpenAIEmbeddings
# from langchain.prompts import PromptTemplate
# from langchain_openai import ChatOpenAI
# from langchain.prompts.prompt import PromptTemplate
# from langchain.text_splitter import RecursiveCharacterTextSplitter
# from langchain.text_splitter import CharacterTextSplitter
# from langchain_community.document_loaders import DirectoryLoader
# from langchain_core.output_parsers import StrOutputParser
# from langchain_core.runnables import RunnablePassthrough 
# from langchain.storage import InMemoryStore
# from langchain.retrievers import ParentDocumentRetriever
# from langchain.schema import format_document
# from langchain_core.messages import get_buffer_string
# from langchain.memory import ConversationBufferMemory
# from operator import itemgetter
# from langchain_core.output_parsers import StrOutputParser
# from langchain_core.prompts import ChatPromptTemplate
# from langchain_core.runnables import RunnableLambda, RunnablePassthrough
# from langchain_openai import ChatOpenAI, OpenAIEmbeddings
# from langchain.chains import RetrievalQA
# from langchain.chains.combine_documents import create_stuff_documents_chain
# from langchain.chains import create_retrieval_chain
# from IPython.display import display
# from IPython.display import Markdown
# import textwrap
# import os
# import dotenv

# def to_markdown(text):
#   text = text.replace('•', '  *')
#   return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))


# dotenv.load_dotenv()
# os.environ["LANGCHAIN_TRACING_V2"] = "true"
# os.environ["LANGCHAIN_API_KEY"] = "ls__7fe13217ba4e448d95f1d294e33a52f8"
# os.environ["GOOGLE_API_KEY"] = "AIzaSyDv6WJ2WRzNqYp0l75fk2SS3asXc-D5NGs"

# # Place your LangChain and OpenAI logic here
# # DATA_PATH = "docs"

# # # Load PDF and setup langchain components
# # loader = DirectoryLoader(DATA_PATH, glob="*.pdf", loader_cls=PyPDFLoader)
# # # loader = PyPDFLoader("docs/introduction-lecture2.pdf", extract_images=True)
# # docs = loader.load_and_split()

# # text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=1000)
# # context = "\n\n".join(str(p.page_content) for p in docs)
# # texts = text_splitter.split_text(context)
# # embeddings = GoogleGenerativeAIEmbeddings(model = "models/embedding-001")

# # vector_index = Chroma.from_documents(texts, embeddings).as_retriever(search_kwargs={"k":5})


# # llm = ChatGoogleGenerativeAI(model="gemini-1.0-pro", temperature=0.2,convert_system_message_to_human=True)


# # _template = """Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question, in its original language.

# # Chat History:
# # {chat_history}
# # Follow Up Input: {question}
# # Standalone question:"""
# # CONDENSE_QUESTION_PROMPT = PromptTemplate.from_template(_template)

# # template = """Use the following pieces of context to answer the question.
# # If you don't know the answer, just say "Apologies, but answer is not given in the provided document", don't try to make up an answer.
# # If there is a numerical question, provide solution with all steps.
# # Give the answer in points with each point in separate line.
# # Give answer in detail.
# # Always say "thanks for asking!" at the end of the answer.
# # {context}

# # Question: {question}
# # """
# # ANSWER_PROMPT = ChatPromptTemplate.from_template(template)

# # DEFAULT_DOCUMENT_PROMPT = PromptTemplate.from_template(template="{page_content}")


# # def _combine_documents(
# #     docs, document_prompt=DEFAULT_DOCUMENT_PROMPT, document_separator="\n\n"
# # ):
# #     doc_strings = [format_document(doc, document_prompt) for doc in docs]
# #     return document_separator.join(doc_strings)
# # memory = ConversationBufferMemory(
# #     return_messages=True, output_key="answer", input_key="question"
# # )
# # # First we add a step to load memory
# # # This adds a "memory" key to the input object
# # loaded_memory = RunnablePassthrough.assign(
# #     chat_history=RunnableLambda(memory.load_memory_variables) | itemgetter("history"),
# # )
# # # Now we calculate the standalone question
# # standalone_question = {
# #     "standalone_question": {
# #         "question": lambda x: x["question"],
# #         "chat_history": lambda x: get_buffer_string(x["chat_history"]),
# #     }
# #     | CONDENSE_QUESTION_PROMPT
# #     | llm
# #     | StrOutputParser(),
# # }
# # # Now we retrieve the documents
# # retrieved_documents = {
# #     "docs": itemgetter("standalone_question") | vector_index,
# #     "question": lambda x: x["standalone_question"],
# # }
# # # Now we construct the inputs for the final prompt
# # final_inputs = {
# #     "context": lambda x: _combine_documents(x["docs"]),
# #     "question": itemgetter("question"),
# # }
# # # And finally, we do the part that returns the answers
# # answer = {
# #     "answer": final_inputs | ANSWER_PROMPT | ChatGoogleGenerativeAI(),
# #     "docs": itemgetter("docs"),
# # }
# # # And now we put it all together!
# # final_chain = loaded_memory | standalone_question | retrieved_documents | answer
# from langchain_google_genai import GoogleGenerativeAI
# from langchain_google_genai import GoogleGenerativeAIEmbeddings

# # Place your LangChain and OpenAI logic here
# DATA_PATH = "docs"

# # Load PDF and setup langchain components
# loader = DirectoryLoader(DATA_PATH, glob="*.pdf", loader_cls=PyPDFLoader)
# # loader = PyPDFLoader("docs/introduction-lecture2.pdf", extract_images=True)
# docs = loader.load()

# llm = GoogleGenerativeAI(model="gemini-pro")
# Embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001 ")

# text_splitter = RecursiveCharacterTextSplitter(chunk_size=300,chunk_overlap=50)
# splits = text_splitter.split_documents(docs)


# from langchain.chains import HypotheticalDocumentEmbedder
# hyde_embeddings = HypotheticalDocumentEmbedder.from_llm(llm,
#                                                   Embeddings,
#                                                   prompt_key = "web_search")



# vectorstore = Chroma.from_documents(documents=splits,
#                                    collection_name='collection-1',
#                                    embedding=hyde_embeddings)
# retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 4})



# template = """Answer the following question based on this context:
# {context}

# Question: {question}
# """
# prompt = ChatPromptTemplate.from_template(template)
# def format_docs(docs):
#    return "\n\n".join(doc.page_content for doc in docs)

# rag_chain = (
#    {"context": retriever | format_docs, "question": RunnablePassthrough()}
#    | prompt
#    | llm
#    | StrOutputParser()
# )
# response = rag_chain.invoke("What are different Chain of Thought(CoT) prompting?")
# print(response)