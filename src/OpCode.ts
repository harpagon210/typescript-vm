enum OpCode {
  OpConstant,
  OpNull,
  OpTrue,
  OpFalse,
  OpEqual,
  OpGreater,
  OpLess,
  OpAdd,
  OpSubtract,
  OpMultiply,
  OpDivide,
  OpNot,
  OpNegate,
  OpPrint,
  OpReturn,
  OpPop,
  OpDefineGlobal,
  OpGetGlobal,
  OpSetGlobal,
  OpGetLocal,
  OpSetLocal,
  OpJumpIfFalse,
  OpJump,
  OpLoop,
  OpUndefined,
  OpCall,
  OpClosure,
  OpGetUpvalue,
  OpSetUpvalue,
  OpCloseUpvalue,
  OpClass,
  OpSetProperty,
  OpGetProperty,
  OpGetSuper,
  OpInherit,
  OpMethod,
  OpInvoke,
  OpSuperInvoke,
  OpArrayInit,
  OpMapInit,
  OpArrayMapSet,
  OpArrayMapGet,
  OpUnknown,
}

export default OpCode;
