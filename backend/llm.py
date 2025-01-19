from langchain_groq import ChatGroq
from langchain_groq import ChatGroq
from utils import *
from dotenv import load_dotenv
import os
from prompts import system_prompt

load_dotenv()
tools = [
    get_kundli_planetary_details,
    get_hora_chart_details,
    get_daily_kundli_nakshatra,
    get_kundli_numerology_details,
    get_astro_kundli_details
]
tool_dict ={
    "get_kundli_planetary_details": get_kundli_planetary_details,
    "get_hora_chart_details": get_hora_chart_details,
    "get_daily_kundli_nakshatra": get_daily_kundli_nakshatra,
    "get_kundli_numerology_details": get_kundli_numerology_details,
    "get_astro_kundli_details": get_astro_kundli_details
}

llm = ChatGroq(model="llama3-70b-8192", api_key=os.getenv("GROQ_API_KEY") )
llm = llm.bind_tools(tools)
def run_tool_from_query(query):
    tool_name = llm.invoke(system_prompt.format(user_input=query)).tool_calls[0]["name"]
    result = tool_dict[tool_name].invoke("")
    return result

if __name__ == "__main__":
        user_input = input("Enter your query: ")
        response = run_tool_from_query(user_input)
        print(response)
        # print(response.tool_calls)
