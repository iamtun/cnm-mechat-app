import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  logo: {
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
  },
  subtitle: {
    marginTop: 10,
    fontSize: 15,
    color: "#C2C2C2",
  },
  input: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  inputData: {
    fontSize: 18,
    borderColor: "#5D90F5",
    borderRadius:10,
    backgroundColor:"#fff",
    borderWidth: 2,
    height: 50,
    width: 350,
    paddingLeft: 20,
    margin: 10,
    flexDirection:"row",
    alignItems:"center"
  },
  pass:{
    fontSize: 18,
    width: 280,
    marginRight: 10
  },
  iconShowPass:{
    
  },
  output: {
    width: 340,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  fogotPass: {
    textDecorationLine: "underline",
    marginRight: 8,
  },
  register: {
    color: "#1E99CA",
  },
});

export default styles;
