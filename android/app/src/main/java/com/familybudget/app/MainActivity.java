package com.familybudget.app;
import com.shakebugs.shake.Shake;



import android.os.Bundle;
import android.os.PersistableBundle;

import androidx.annotation.Nullable;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(@Nullable Bundle savedInstanceState, @Nullable PersistableBundle persistentState) {
    super.onCreate(savedInstanceState, persistentState);
    Shake.start(this, "6kngWVlEFJFYTfhaeIGWmQxxRSUBNLgAFnfu6kY5", "iXpHIMjUxUBTK5uvBL540N8WEFvKEMtXgj9VjQ4TZ5IiYU7L5aFtpFr");
  }
}
